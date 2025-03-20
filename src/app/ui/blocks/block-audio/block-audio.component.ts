import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgModule, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'cq-block-audio',
  templateUrl: './block-audio.component.html',
  styleUrls: ['./block-audio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockAudioComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public block!: any; // block.content — URL или ArrayBuffer

  @Input()
  public current!: boolean;

  @Output()
  public selectAnswer = new EventEmitter<string>();

  @ViewChild('audioElement', { static: false }) audioElement!: ElementRef<HTMLAudioElement>;

  audioUrl: SafeUrl | string = '';
  isPlaying = false;
  currentTime = 0;
  duration = 0;

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.prepareAudio();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['block']) {
      this.prepareAudio();
    }
  }

  ngOnDestroy(): void {
    if (this.audioUrl && typeof this.audioUrl === 'string' && this.audioUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.audioUrl);
    }
  }

  private prepareAudio(): void {
    if (!this.block?.content) return;

    if (this.block.content instanceof ArrayBuffer) {
      const blob = new Blob([this.block.content], { type: 'audio/mpeg' });
      this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    } else {
      this.audioUrl = this.block.content;
    }
  }

  togglePlay(): void {
    const audio = this.audioElement.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  onLoadedMetadata(): void {
    this.duration = this.audioElement.nativeElement.duration;
  }

  onTimeUpdate(): void {
    this.currentTime = this.audioElement.nativeElement.currentTime;
  }

  seek(event: Event): void {
    const audio = this.audioElement.nativeElement;
    const value = (event.target as HTMLInputElement).value;
    audio.currentTime = +value;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }
}

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
  ],
  declarations: [
    BlockAudioComponent,
  ],
  exports: [
    BlockAudioComponent,
  ],
})
export class BlockAudioModule {}