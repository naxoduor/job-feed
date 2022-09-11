<template>
  <div class="home">
    <!-- <Todos v-bind:todos="todos">
      <div v-bind:key="todo.id" v-for="todo in todos">
        <h3>{{todo.title}}</h3>
      </div> -->
    <job-feed
      :job-filters="jobFilters"
      :position-functions="positionFunctionFilters"
      :sub-position-functions="subPositionFunctionFilters"
    v-on:get_position_functions="get_position_functions"
    v-on:get_listings_by_pf_id="get_listings_by_pf_id"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import JobFeed from '@/components/JobFeed.vue';
import BaseApi from '@/api-requests/api';
import { IPage, PositionFunction, Job } from '@/models/models';

@Component({
  components: {
    JobFeed,
  },
})

export default class Home extends Vue {
  private mojobApi: BaseApi | null = null;
  private positionFunctionFilters: PositionFunction[] = [];
  private subPositionFunctionFilters: PositionFunction[] = [];
  private jobFilters: Job[] =[]


  // props:["todos"]

  /**
   * Here you can do necessary request to our
   * public test-API in order to retrieve a list of job listings and a list of
   * position function filters.
   *
   * You can test the endpoints and see the documentation at:
   * https://test-api.mojob.io/public/docs/
   *
   * @private
   */


  private async mounted() {
    // Here is an example on how to retrieve job position function filters

    this.mojobApi = new BaseApi(
      'https://test-api.mojob.io/public/',
      this.axios
    );

    try{
      const jobsFilterPage: Job[]
      =await this.mojobApi.getJobListings();
      this.jobFilters=jobsFilterPage
    }
    catch(e)
    {
      console.log("failed loading job listing")
      console.log(e)
    }
    try {
      const positionFunctionResponsePage: IPage<PositionFunction> =
        await this.mojobApi.getPositionFunctions();
      if (positionFunctionResponsePage.results) {
        this.positionFunctionFilters = positionFunctionResponsePage.results;
        console.log("print the position filters")
        console.log(JSON.stringify(this.positionFunctionFilters, null, 2));
        console.log(this.positionFunctionFilters);
      } else {
        console.log('Failed loading position function filters');
      }
    } catch (e) {
      console.log('Failed loading position function filters');
      console.log(e);
    }
  }

  async get_position_functions(positionFunction: PositionFunction){
     this.mojobApi = new BaseApi(
      'https://test-api.mojob.io/public/',
      this.axios
    );
     try {
      const positionFunctionResponsePage: IPage<PositionFunction> =
        await this.mojobApi.getPositionFunctionsByTitle(positionFunction!.children[0]!.name!);
      if (positionFunctionResponsePage.results) {
        this.subPositionFunctionFilters = positionFunctionResponsePage.results;
      } else {
        console.log('Failed loading position function filters');
      }
    } catch (e) {
      console.log('Failed loading position function filters');
      console.log(e);
    }


    try{
      const jobsFilterPage: Job[]
      =await this.mojobApi.getJobListingsByPositionFilter(positionFunction.id!)
      this.jobFilters=jobsFilterPage
    }
    catch(e)
    {
      console.log("failed loading job listing")
      console.log(e)
    }

 
   }
}
</script>
