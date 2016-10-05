import Vue from 'vue'
import moment from 'moment'
import DateInput from 'src/components/DateInput'

describe('DateInput.vue', () => {
  context('without date prop', () => {
    it("render today's date into input", () => {
      const vm = new Vue({
        template: '<div><date-input v-ref:date-input></date-input></div>',
        components: { DateInput }
      }).$mount()

      expect(vm.$el.querySelector('.year-input').value)
        .to.contain(moment().format('YYYY'))
      expect(vm.$el.querySelector('.month-input').value)
        .to.contain(moment().format('MM'))
      expect(vm.$el.querySelector('.day-input').value)
        .to.contain(moment().format('DD'))
    })
  })

  context('with date prop', () => {
    beforeEach(function () {
      this.date = '2016/09/20'
      this.vm = new Vue({
        template: `<div><date-input date="${this.date}" v-ref:date-input></date-input></div>`,
        components: { DateInput }
      }).$mount()
      this.vm.$appendTo('body')
      this.dateInput = this.vm.$refs.dateInput
    })

    it('render given the date into input', function () {
      expect(this.vm.$el.querySelector('.year-input').value)
        .to.contain(moment(this.date).format('YYYY'))
      expect(this.vm.$el.querySelector('.month-input').value)
        .to.contain(moment(this.date).format('MM'))
      expect(this.vm.$el.querySelector('.day-input').value)
        .to.contain(moment(this.date).format('DD'))
    })

    describe('computed', function () {
      describe('#currentDate', function () {
        it('returns given date', function () {
          expect(this.dateInput.currentDate).to.eq(this.date)
        })
      })

      describe('#currentDate=', function () {
        context('with valid date', function () {
          beforeEach(function () {
            this.spy = sinon.spy()
            this.dateInput.$on('changed', this.spy)
            this.newDate = '2017-09-20'
            this.dateInput.currentDate = this.newDate
          })

          it('sets given date to `date` prop', function () {
            expect(this.dateInput.currentDate).to.eq(this.newDate)
          })

          it('dispatches `changed` event', function () {
            expect(this.spy).to.have.been.calledWith(this.dateInput.currentDate)
          })
        })

        context('with invalid date', function () {
          beforeEach(function () {
            this.newDate = 'invalid date'
            this.dateInput.currentDate = this.newDate
          })

          it('does not set given date to `date` prop', function () {
            expect(this.dateInput.currentDate).to.eq(this.date)
          })
        })
      })

      describe('#year', function () {
        it('returns given year string', function () {
          expect(this.dateInput.year).to.eq('2016')
        })
      })

      describe('#year=', function () {
        it('sets given year to #currentDate', function () {
          const newYear = '2017'
          this.dateInput.year = newYear
          expect(this.dateInput.year).to.eq(newYear)

          const newMoment = moment(this.date).year(newYear)
          expect(moment(this.dateInput.currentDate).isSame(newMoment)).to.true
        })
      })

      describe('#month', function () {
        it('returns given year string', function () {
          expect(this.dateInput.month).to.eq('09')
        })
      })

      describe('#month=', function () {
        it('sets given month to #currentDate', function () {
          const newMonth = '08'
          this.dateInput.month = newMonth
          expect(this.dateInput.month).to.eq(newMonth)

          const newMoment = moment(this.date).month(newMonth - 1)
          expect(moment(this.dateInput.currentDate).isSame(newMoment)).to.true
        })
      })

      describe('#day', function () {
        it('returns given year string', function () {
          expect(this.dateInput.day).to.eq('20')
        })
      })

      describe('#day=', function () {
        it('sets given day to #currentDate', function () {
          const newDay = '01'
          this.dateInput.day = newDay
          expect(this.dateInput.day).to.eq(newDay)
          expect(this.dateInput.currentDate).to.eq(moment(this.date).date(newDay).format())
        })
      })

      describe('#focusIndex', function () {
        it('returns #focusCounter', function () {
          expect(this.dateInput.focusIndex).to.eq(this.dateInput.focusCounter)
        })
      })

      describe('#focusIndex=', function () {
        it('arounds value', function () {
          this.dateInput.focusIndex = 3
          expect(this.dateInput.focusIndex).to.eq(0)

          this.dateInput.focusIndex = -1
          expect(this.dateInput.focusIndex).to.eq(2)

          this.dateInput.focusIndex = 1
          expect(this.dateInput.focusIndex).to.eq(1)
        })
      })
    })

    describe('methods', function () {
      describe('#inputClicked', function () {
        it('sets #focusIndex to 1', function () {
          this.dateInput.$els.monthInput.click()
          expect(this.dateInput.focusIndex).to.eq(1)
        })
      })

      describe('#focusPrev', function () {
        it('decrements #focusIndex', function () {
          expect(() => { this.dateInput.focusPrev() })
            .to.alter(() => this.dateInput.focusIndex, { from: 0, to: 2 })
        })
      })

      describe('#focusNext', function () {
        it('increments #focusIndex', function () {
          expect(() => { this.dateInput.focusNext() })
            .to.alter(() => this.dateInput.focusIndex, { from: 0, to: 1 })
        })
      })
    })
  })
})
