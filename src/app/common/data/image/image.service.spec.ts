import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ScreenImage } from '../../models/screen-image';

import { ImageService } from './image.service';

describe('Service: ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService],
    });
  });

  it('should be created', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));

  it('should get list', inject([ImageService, HttpTestingController], (service: ImageService, backend: HttpTestingController) => {
    const mockData = [new ScreenImage('id', 'src')];
    service.loadList()
      .subscribe(data => {
        expect(data).toEqual(mockData);
      });

    backend.expectOne({
      method: 'GET',
      url: 'api/file',
    }).flush(mockData);
  }));
});
