import { AxiosStatic } from 'axios';
import { IPage, PositionFunction, JobListing,Job } from '@/models/models';

export default class BaseApi {
  public axios!: AxiosStatic;
  protected baseUrl: string;

  constructor(url: string, axios: AxiosStatic) {
    this.baseUrl = url;
    this.axios = axios;
  }

  public getPositionFunctions = (): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?page_size=100`)
      .then((response) => response.data);

  /**
   * TIP: Create a function called getJobListings
   * Use our public api documentation to find out what endpoint to use
   * https://test-api.mojob.io/public/docs/
   */

  public getJobListings = (): Promise<Job[]> => 
  this.axios
  .get(`${this.baseUrl}job/listings/`)
  .then((response)=>response.data)

  public getPositionFunctionsByTitle = (title: string): Promise<IPage<PositionFunction>> =>
  this.axios
        .get(`${this.baseUrl}job/position-functions/?search=${title}`)
        .then((response) => response.data);

  public getJobListingsByPositionFilter = (id:string): Promise<Job[]> => 
  this.axios
  .get(`${this.baseUrl}job/listings/?search=${id}`)
  .then((response) => response.data);   
}

/**
 * getPositionFunctionsById
 */

  
