<template>
  <div class="home">
   <Header 
    :numCorrect="numCorrect"
    :numTotal="numTotal"
     />

  <b-container class="bv-example-row">
    <b-row>
      <QuestionBox 
      v-if="questions.length" 
      :currentQuestion="questions[index]" 
      :increment="increment"  
      :next="next" />
    </b-row>
  </b-container>
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header'
import QuestionBox from '@/components/QuestionBox'

export default {
  name: 'Home',
  components: {
    Header,
    QuestionBox
  },

  data(){

    return {
      questions: {},
      index: 0,
      numCorrect: 0,
      numTotal: 0
    }
  },

  methods:{

    next(){
      return this.index++
    },

    increment(isCorrect){

      if(isCorrect){

        this.numCorrect++
      }
        this.numTotal++
    }
  },

  mounted(){
    fetch('https://opentdb.com/api.php?amount=10&category=27&type=multiple', {
      method: 'Get'
    }).then(res => {

      return res.json();

    }).then(jsonData => {

      this.questions = jsonData.results;
    })
  }
}
</script>
