<template>
  <div class="cal-body">
    <div @click="clickPrev()" class="arr arr-left">&lt;</div>
    <div class="cal">
      <div v-for="(num, idx) in months(3)" :key="num">
        <div class="current-month month">
          <div class="year-month">
            <div class="year"> {{year}}</div>
            <div class="monthWord">{{getThisMonthWord(month + idx)}}</div>
          </div>
          <div class="nums">
            <div class="num thisMonth" v-for="i in daysInMonth(month + idx)"
              :class="month + idx === currMonth && year === currYear ? i <= day ? i < day ? 'past' : 'active' : 'current' : 'next-month'" :key="i"
              @click="clickDateOne(parseInt(`${idx}00`) + i)" :id="parseInt(`${idx}00`) + i">
              {{i}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="arr" @click="clickNext()">></div>
  </div>



</template>

<script>


export default {
  name: 'App',
  inject: ['booked'],
  data() {
    return {
      date: new Date(),
      month: new Date().getMonth() + 1,
      currMonth: new Date().getMonth() + 1,
      clickedNext: 2,
      year: new Date().getFullYear(),
      currYear: new Date().getFullYear(),
      day: new Date().getDate(),
      first: 0,
      firstMonth: new Date().getMonth() + 1,
      second: 0,
     
      

    }
  },
  methods: {
  
    months(i) {
      return i;
    },
    betweenDates(start, end) {
      for (let i = start + 1; i <= end; i++) { 
        document.getElementById(i).classList.add('between-date');
      }
    },
    daysInMonth(month) {
      
      return new Date(new Date().getFullYear(), month, 0).getDate()

    },
    unselectDates() {
      document.getElementById(this.second).classList.remove('selected-date');
      document.getElementById(this.first).classList.remove('selected-date');
      document.querySelectorAll('.between-date').forEach(el => {
        el.classList.remove('between-date');
      });
      this.first = this.second = 0;
    },
    clickDateOne(id){
     console.log(this.currMonth);
      let selectedMonth = this.month + (id.toString().length < 3 ? 0 : parseInt(id.toString()[0]));
      //console.log(id.toString().length, selectedMonth);
      if(this.first === 0) {
      document.getElementById(id).classList.add('selected-date');
      this.first = id;
      this.firstMonth = selectedMonth;
      } else if (this.second === 0 && this.first < parseInt(id)){
        this.second = id;

        if (this.firstMonth === selectedMonth) {
          this.betweenDates(this.first, this.second - 1)
        } else {
        this.betweenDates(this.first, parseInt(`${this.firstMonth - this.month}00`) + this.daysInMonth(this.firstMonth));

        this.betweenDates(parseInt(`${selectedMonth - this.month}00`), this.second -1); 
        }

        for (let i = this.firstMonth + 1; i< selectedMonth; i++) {
         let start = parseInt(`${i - this.month}00`);
         let end = start + this.daysInMonth(i);
        this.betweenDates(start, end);
        }

        document.getElementById(id).classList.add('selected-date');
        
      } else {
        this.unselectDates();
      }
      
    },
    clickPrev() {
      if(this.month === this.currMonth && this.year === this.currYear) {
        document.getElementsByClassName('arr-left')[0].style.disabled = 'disabled';
      } else {
      if (this.month === 1) {
        
        this.month = 10;
        this.year--;
      } else {
        this.month -= 3;
      }
      }
      this.unselectDates();
    },
    clickNext() {
      if(this.month === 10) {
        
        this.month = 1;
        this.year++;
      } else {
        this.month += 3;
      }
      this.unselectDates();
    },

   
    getBookedDays(month) {
      this.booked[month].forEach(el => {
        if(this.month === month){
          document.getElementById('10000' + el).classList.add('past')
        } else {
          document.getElementById('10000'+ el).classList.add('past')
        }
      }
      );
      
    },
    getThisMonthWord(month){
      
      let word = '';
      switch (month) {
        case 1:
          word = 'January';
          break;
        case 2:
          word = 'February';
          break;
        case 3:
          word = 'March';
          break;
        case 4:
          word = 'April';
          break;
        case 5:
          word = 'May';
          break;
        case 6:
          word = 'June';
          break;
        case 7:
          word = 'July';
          break;
        case 8:
          word = 'August';
          break;
        case 9:
          word = 'September';
          break;
        case 10:
          word = 'October';
          break;
        case 11:
          word = 'November';
          break;
        case 12:
          word = 'December';
          break;
        default:
          break;
      }
      return word;
    },
    
  },
  mounted(){
  
  },
  components: {
   
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
.cal-body {
  display: flex;
  align-items: center;
  
}
.arr {
  font-size: 30px;
  cursor: pointer;
}
.cal {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  
}
.cal  .month {
  max-width: 300px;
  
}
.year-month {
  display: flex;
  justify-content: center;

}
.monthWord {
  margin-left:10vw;
}
.nums {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;

}
.num {
  width:20px;
  height: 20px;
  margin: 10px 10px;
  padding:6px; 
}
.current {
  cursor: pointer;
}
.next-month {
 cursor: pointer;
}
.selected-date {
  border-radius: 50%;
  color: #fff;
  background-color: #2c3e50;
}
.between-date {
  background-color: #2c3e50a0;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.708);
  opacity: 0.7;
  cursor:auto;

}
.active {
  font-weight: 700;
  border-radius: 50%;
  color: #fff;
  background-color: #ccc;
}
.past {
  color: #ccc;
  pointer-events: none;
}
</style>
