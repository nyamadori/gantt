import Vue from 'vue'
import moment from 'moment'
import DatePicker from 'src/components/DatePicker'

describe('DatePicker.vue', () => {
  context('without date prop', () => {
    it("render today's date into input", () => {
      const vm = new Vue({
        template: '<div><date-picker v-ref:date-picker></date-picker></div>',
        components: { DatePicker }
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
        template: `<div><date-picker date="${this.date}" v-ref:date-picker></date-picker></div>`,
        components: { DatePicker }
      }).$mount()
      this.datePicker = this.vm.$refs.datePicker
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
          expect(this.datePicker.currentDate).to.eq(this.date)
        })
      })

      describe('#currentDate=', function () {
        context('with valid date', function () {
          beforeEach(function () {
            this.spy = sinon.spy()
            this.datePicker.$on('changed', this.spy)
            this.newDate = '2017-09-20'
            this.datePicker.currentDate = this.newDate
          })

          it('sets given date to `date` prop', function () {
            expect(this.datePicker.currentDate).to.eq(this.newDate)
          })

          it('dispatches `changed` event', function () {
            expect(this.spy).to.have.been.calledWith(this.datePicker.currentDate)
          })
        })

        context('with invalid date', function () {
          beforeEach(function () {
            this.newDate = 'invalid date'
            this.datePicker.currentDate = this.newDate
          })

          it('does not set given date to `date` prop', function () {
            expect(this.datePicker.currentDate).to.eq(this.date)
          })
        })
      })

      describe('#year', function () {
        it('returns given year string', function () {
          expect(this.datePicker.year).to.eq('2016')
        })
      })

      describe('#year=', function () {
        it('sets given year to #currentDate', function () {
          const newYear = '2017'
          this.datePicker.year = newYear
          expect(this.datePicker.year).to.eq(newYear)

          const newMoment = moment(this.date).year(newYear)
          expect(moment(this.datePicker.currentDate).isSame(newMoment)).to.true
        })
      })

      describe('#month', function () {
        it('returns given year string', function () {
          expect(this.datePicker.month).to.eq('09')
        })
      })

      describe('#month=', function () {
        it('sets given month to #currentDate', function () {
          const newMonth = '08'
          this.datePicker.month = newMonth
          expect(this.datePicker.month).to.eq(newMonth)

          const newMoment = moment(this.date).month(newMonth - 1)
          expect(moment(this.datePicker.currentDate).isSame(newMoment)).to.true
        })
      })

      describe('#day', function () {
        it('returns given year string', function () {
          expect(this.datePicker.day).to.eq('20')
        })
      })

      describe('#day=', function () {
        it('sets given day to #currentDate', function () {
          const newDay = '01'
          this.datePicker.day = newDay
          expect(this.datePicker.day).to.eq(newDay)
          expect(this.datePicker.currentDate).to.eq(moment(this.date).date(newDay).format())
        })
      })

      describe('#focusIndex', function () {
        it('returns #focusCounter', function () {
          expect(this.datePicker.focusIndex).to.eq(this.datePicker.focusCounter)
        })
      })

      describe('#focusIndex=', function () {
        it('arounds value', function () {
          this.datePicker.focusIndex = 3
          expect(this.datePicker.focusIndex).to.eq(0)

          this.datePicker.focusIndex = -1
          expect(this.datePicker.focusIndex).to.eq(2)

          this.datePicker.focusIndex = 1
          expect(this.datePicker.focusIndex).to.eq(1)
        })
      })
    })

    describe('methods', function () {
      describe('#inputClicked', function () {
        it('sets #focusIndex to 1', function () {
          this.datePicker.$els.monthInput.click()
          expect(this.datePicker.focusIndex).to.eq(1)
        })
      })

      describe('#focusPrev', function () {
        it('decrements #focusIndex', function () {
          expect(() => { this.datePicker.focusPrev() })
            .to.alter(() => this.datePicker.focusIndex, { from: 0, to: 2 })
        })
      })

      describe('#focusNext', function () {
        it('increments #focusIndex', function () {
          expect(() => { this.datePicker.focusNext() })
            .to.alter(() => this.datePicker.focusIndex, { from: 0, to: 1 })
        })
      })
    })
  })
})
