<template> 
    <div>
        <b-jumbotron sm-6 offset-3>
            <template #lead>
                <h4>{{currentQuestion.question}}</h4>
            </template>

            <hr class="my-4">
                <b-list-group v-for="(answer, index) in shuffleAnswers" :key="index">
                    <b-list-group-item :class="answerClass(index)" @click.prevent="selectAnswer(index)">{{answer}}</b-list-group-item>
                </b-list-group>
            

            <b-button variant="primary" :disabled="selectedIndex == null || answered " @click.prevent="submitAnswer">Submit</b-button>
            <b-button variant="success" :disabled="next == 5" @click.prevent="next">Next</b-button>
        </b-jumbotron>
</div>
</template>

<script>

//import _ from 'lodash'

export default {

    data(){
        return {
            selectedIndex: null,
            shuffleAnswers: [],
            correctIndex: null,
            answered: false,
            questions:0
        }
    },

  props:['currentQuestion', 'next', 'increment'],

  computed: {
    answers(){
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer);
      return answers;
    }
  },

    watch: {
        currentQuestion:{
            immediate: true,

           handler(){
            this.answered= null,
            this.selectedIndex = null,
            this.shuffledAnswers()
           }
        }
        
    },
   
      
  methods:{
      
    selectAnswer(index){

        this.selectedIndex = index;
    },

    shuffledAnswers(){
        let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer];
        this.shuffleAnswers = _.shuffle(answers);
        this.correctIndex = this.shuffleAnswers.indexOf(this.currentQuestion.correct_answer);
    },

    submitAnswer(){
        let isCorrect = false;
        if(this.selectedIndex === this.correctIndex){
            isCorrect = true;
        }

        this.answered = true;
        this.increment(isCorrect);

    },

    answerClass(index){

        let answerClass = ''

        if(!this.answered && this.selectedIndex === index){
            answerClass = 'selected'
        }else if(this.answered && this.correctIndex === index){
            answerClass = 'correct'
        }else if(this.answered && this.selectedIndex === index && this.correctIndex !== index){
            answerClass = 'incorrect'
        }
        return answerClass;
    }

  },

}
</script>

<style scoped>
    .list-group{
        margin-bottom: 10px;
    }

    .list-group-item:hover{
        background-color: #EEE;
        cursor: pointer;
    }

    .selected{
        background-color:lightblue;
    }

    .correct{
        background-color:lightgreen;
    }

    .incorrect{
        background-color: red;
    }

    .btn{
        margin: 5px
    }
</style>