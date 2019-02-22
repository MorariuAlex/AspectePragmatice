import {CityModel} from './city.model';

export class User {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url: string;
  gender: string;
  birth_date: string;
  phone_number: string;
  city_id: number;
  email: string;
  password: string;
  city: CityModel;
}
