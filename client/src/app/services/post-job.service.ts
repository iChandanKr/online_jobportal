import { inject, Injectable } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../model/skill.model';

@Injectable({ providedIn: 'root' })
export class PostJobService {
  private readonly skillUrl = API_URLS.fetchSkills;
  private httpClient = inject(HttpClient);

  fetchExistingSkills() {
    return this.httpClient.get<{ data: Skill[] }>(this.skillUrl);
  }
}
