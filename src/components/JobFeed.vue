<template>
<div>
  <div class="job-feed">JOB FEED</div>

  
<!-- <select v-on:change ="onChange()" v-model="selected"> -->
  <select v-on:change ="$emit('get_position_functions',selected)" v-model="selected">
    <option disabled value="">Please Select</option>
    <option  :value="positionFunction" v-bind:key="positionFunction.id" v-for="positionFunction in positionFunctions" v-on:click="$emit('get_listings_by_pf_id',positionFunction.id)">{{positionFunction.children[0].name}}
    </option>
    <option v-bind:key="subPositionFunction.id" v-for="subPositionFunction in subPositionFunctions">{{subPositionFunction.children[0].name}}
    </option>
</select>

  <div class="job-listing" v-bind:key="jobFilter.key" v-for="jobFilter in jobFilters">
    <div class="job-description">
    <div class="job-title">{{jobFilter.job.title}}</div>
    <div class="jobs">
    <div class="job-items">{{jobFilter.job.unit.name}}</div>
    <div class="job-items">{{jobFilter.job.due_date}}</div>
    <div style='clear:both'></div>
    </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { JobListing, PositionFunction,Job } from '@/models/models';

@Component
export default class JobFeed extends Vue {
  @Prop({ default: () => [], type: Array as () => Job[] })
  private jobFilters!: Job[];
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  private positionFunctions!: PositionFunction[];
  
  
}


</script>
<style scoped>
span {
  padding: 5px 20px;
  float: left;
  width: 40%;
}
h4{
  /* float: left; */
}
.job-description{
  border: 1px solid rgba(100, 100, 111, 0.2);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 80%;
  border-radius: 5px;
  margin-top: 5px;
}
.job-listing{
   
}
.jobs{
  width: 80%;
  display:flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
}
.job-title {
  display: flex;
  font-weight: 600;
  padding: 0px 10px;
}
.job-items{
  padding: 20px 5px;
}

.optionGroup {
    font-weight: bold;
    font-style: italic;
}
    
.optionChild {
    padding-left: 15px;
}



</style>
