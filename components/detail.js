Vue.component('detail', {
  template: `
  <div>
  <!-- Feed content -->
  <div class="jumbotron">
    <feed-detail
      v-bind:feed="feed"
      v-bind:formVisible="formVisible"
      v-on:editLikes="editFeed"
      v-on:toggleForm="formVisible = !formVisible">
    </feed-detail>

    <!-- form for editting feeds -->
    <my-form
      v-show="formVisible"
      btnText="Edit"	
      v-bind:feedName="feed.name"
      v-bind:feedText="feed.text"
      v-on:formSubmitted="editFeed">
    </my-form>
  </div>  

  <!-- comments -->
  <comment-section
    v-bind:feed="feed"
    v-on:commentChange="getData">
  </comment-section>
  </div>`,
  name: "Detail",

  data: function() {
    return {
      // feed object
      feed: {},
      // hide/show edit form
      formVisible: false
    }
  },

  methods: {
    // get feed from DB
    getData: function(id) {    
      api.getFeed(id)
        .then( response => {
          if(response.status === 200) {
            // save response as object
            this.feed = response.data;
          }
        })
        .catch( e => console.log(e))
    },

    // update feed in DB
    editFeed: function(newFeed) {
      newFeed.timestamp= this.feed.timestamp;
      newFeed.likes= this.feed.likes;
      
      api.updateFeed(this.feed.id, newFeed)
        .then( response => {
          if(response.status === 200) {
            // load updated feed
            this.getData(this.feed.id);
            // hide edit form
            this.formVisible = false;
          }
        })
        .catch( e => console.log(e))
    }
  },

  // load feed on page load
  created: function() {
    this.getData(this.$route.params.id);
  }
})