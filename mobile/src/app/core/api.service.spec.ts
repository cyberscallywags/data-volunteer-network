import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { ApiService, Item } from './api.service';

describe('ApiService', () => {
  let api: ApiService;
  let http: HttpTestingController;
  const base = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('reads health from /health', () => {
    let body: unknown;
    api.health().subscribe((h) => (body = h));
    http.expectOne(`${base}/health`).flush({ status: 'ok', env: 'test', neo4j: true });
    expect(body).toEqual({ status: 'ok', env: 'test', neo4j: true });
  });

  it('lists items with a limit', () => {
    let items: Item[] = [];
    api.listItems(5).subscribe((i) => (items = i));
    const req = http.expectOne((r) => r.url === `${base}/items`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('limit')).toBe('5');
    req.flush([{ id: '1', name: 'a', created_at: '2026-01-01T00:00:00Z' }]);
    expect(items.map((i) => i.name)).toEqual(['a']);
  });

  it('posts new items as {name}', () => {
    api.createItem('widget').subscribe();
    const req = http.expectOne(`${base}/items`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'widget' });
    req.flush({ id: '1', name: 'widget', created_at: '2026-01-01T00:00:00Z' });
  });
});
