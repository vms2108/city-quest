import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Block } from 'src/app/common/interfaces/block.interface';
import { BLOCK_DISTRIBUTION_COMPONENTS } from 'src/app/ui/constructor-distribution/block-distribution.types';
import { BlockDistributionService } from 'src/app/ui/constructor-distribution/block-distribution.service';

@Component({
  selector: 'cq-admin-block-example',
  templateUrl: './admin-block-example.component.html',
  styleUrls: ['./admin-block-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlockExampleComponent implements OnChanges {
  @Input()
  public blocks: Block[] = [];

  @ViewChild('blocksContainer', { read: ViewContainerRef })
  public blocksContainer!: ViewContainerRef;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly blockDistributionService: BlockDistributionService,
  ) {}

  public ngOnChanges(): void {
    if (this.blocks && this.blocks.length > 0) {
      this.loadBlocks(this.blocks);
    }
  }

  private async loadBlocks(blocks: Block[]): Promise<void> {
    if (this.blocksContainer) {
      this.blocksContainer.clear();
    }
    await this.lazyLoadBlock(blocks, 0);
  }

  private async lazyLoadBlock(blocks: Block[], index: number): Promise<void> {
    if (!blocks[index]) {
      this.changeDetectorRef.markForCheck();
      return;
    }

    const block = blocks[index];
    const blockFactory = await this.blockDistributionService.getComponentFactory(block.type);
    const component = this.blocksContainer.createComponent<BLOCK_DISTRIBUTION_COMPONENTS>(blockFactory);
    
    // Set component properties
    component.instance.block = block;
    component.instance.current = true;
    
    // Trigger change detection if needed
    if ((component.instance as any).ngOnChanges) {
      (component.instance as any).ngOnChanges();
    }

    // Load next block recursively
    await this.lazyLoadBlock(blocks, index + 1);
    this.changeDetectorRef.markForCheck();
  }
}
