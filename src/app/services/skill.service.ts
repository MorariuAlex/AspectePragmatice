import {Injectable} from "@angular/core";
import {SkillSearchModel} from "../models/skill-search.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SkillModel} from "../models/skill.model";

@Injectable()
export class SkillService {
  private _skills: SkillModel[] = [];
  private _mySkills: SkillModel[] = [];

  constructor(private http: HttpClient) {
  }

  public initSkills() {
    this.http.get<SkillModel[]>(environment.apiUrl + '/skills')
      .subscribe(value => this._skills = value);
  }

  get allSkills() {
    return this._skills;
  }

  public getMySkills(id: number) {
    this.http.get<SkillModel[]>(environment.apiUrl + '/user/' + id + '/skills')
      .subscribe(value => this._skills = value);
  }

  get mySkills(){
    return this._mySkills;
  }

}
