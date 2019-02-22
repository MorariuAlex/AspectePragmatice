import { CityModel } from './city.model';
import { Employer } from './employer.mode';

export class JobPostingModel {
  id: number;
  title: string;
  city: CityModel;
  employer: Employer;
  description: string;
  payment: number;
  startDate: string;
  endDate: string;
}
