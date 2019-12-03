import { version } from './package.json'

export let printMsg = function () {
  console.log('This is a message from the demo package')
  console.log('this is an update')
}
export let aMixins = {
  data () {
    return {
      typeTimer: {}
    }
  },
  computed: {
    // ...mapState(['store']),
  },
  watch: {},
  methods: {
    xaxPackInit: function () {
      console.log('thanks for using xaxpack@' + version)
    },
    set: function (path, value) {
      //table.0.filter //tanımsızsa sayılar array|object tanımlanıyor, ilk key data'da tanımlı olmalı (store gibi)
      let
        paths = path.split('.'),
        pathLen = paths.length,
        th = this,
        lastPath = 'th'
      paths.map((k, i) => {
        let currentPath = lastPath + '["' + k + '"]'
        if (i !== pathLen - 1) {//sonuncu değilse
          let nextKey = paths[i + 1]
          if (typeof eval(currentPath) === 'undefined')
            this.$set(eval(lastPath), k, isNaN(nextKey) ? {} : [])
          lastPath = currentPath
        } else//sonuncu ise
          this.$set(eval(lastPath), k, value)
      })
    },
    selfromdataf: function (data, k, v) {
      if (data && typeof data === 'object') {
        data = Object.values(data)
        return data.map((x, key) => ({ text: x[k], value: x[v] }))
      }
    },
    objSearch: function (obj, key, val, def = undefined) {
      obj = Object.values(obj)
      let a = obj.filter(x => x[key] === val).shift()
      return a ? a : def//else undefined
    },
    objFilter: function (obj, predicate) {
      let result = {}, key
      for (key in obj)
        if (obj.hasOwnProperty(key) && predicate(obj[key]))
          result[key] = obj[key]
      return result

    },
    // setState: function (path, value) {  //to compress 2 var to array // for easiness
    //   this.$store.commit('setStateM', [path, value])
    //   return true
    // },
    con: function (...items) {console.log(...items)},
    isEmpty: function (item) {
      return !(item && Object.keys(item).length)
    },
    // trans: function (key) {
    //   return Lang.has('admin.' + key) ? Lang.get('admin.' + key) :
    //     (Lang.has('site.' + key) ? Lang.get('site.' + key) : key)
    // },
    urlSegment: function ($i) {
      return location.href.split('/')[$i]
    },
    delayed: function (callback, time = 1000, name = 'default') {
      clearTimeout(this.typeTimer[name])
      this.typeTimer[name] = setTimeout(callback, time)
    },
    // daterangepickerSet: function () {
    //   $('#daterangepicker').daterangepicker({
    //     //alwaysShowCalendars: true,
    //     ranges: {
    //       'Today': [moment(), moment()],
    //       'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
    //       'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
    //       'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
    //       'This Month': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
    //       'Last Month': [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').endOf('day')]
    //     },
    //     minDate: moment().subtract(2, 'years'),
    //     callback: function (date1, date2, period) {
    //       $(this).val(date1.format('L') + ' + ' + date2.format('L'))
    //     },
    //     linkedCalendars: false,
    //     opens: 'center',
    //     autoUpdateInput: false,
    //   }, (date1, date2, label) => {
    //     this.table.filter.date = date1.format('L') + ' – ' + date2.format('L')
    //     this.table.filter.date1 = date1.format('YYYY-MM-DD')
    //     this.table.filter.date2 = date2.format('YYYY-MM-DD')
    //   })
    //     .attr('size', 23)
    //   // this.$refs.table.$watch('localItems',function(val){}, { deep: true })
    // },

    // waitForSocket: function (callback, failed = false) {
    //   if (this.store.echoStatus)
    //     setTimeout(() => callback(), failed ? 1000 : 100)
    //   else
    //     setTimeout(() => this.waitForSocket(callback, true), 100)
    // },
    //webapi

    // <loading-toastr> invalidateInputs $root.postPath
    post: function (path, a, b, c, d) {  //foreach object closure boolean string
      if (this.$root.$refs.app) if (this.$root.$refs.app.$refs.lt) this.tc(() => this.$root.$refs.app.$refs.lt.show())
      let last_button = null
      if (event && event.target && event.target.nodeName == 'BUTTON') {
        last_button = event.target
        last_button.disabled = true
      }
      path = path.replace('/' + this.$root.postPath + '/', '')
      return new Promise((resolve, reject) => {
        let func = () => {}, obj = {}, notify = false;
        [a, b, c].forEach(item => {
          if (typeof item === 'function') func = item
          else if (typeof item === 'object') obj = item
          else if (typeof item === 'boolean') notify = item
        })
        axios.post('/' + this.$root.postPath + '/' + path, obj).then(r => {
          if (this.$root.$refs.app) if (this.$root.$refs.app.$refs.lt) this.$root.$refs.app.$refs.lt.hide()
          if (r.status === 200)
            if (r.data.status) {
              func(r)
              notify && toastr.success(r.statusText || 'done')
            } else {
              if (this.invalidateInputs) if (r.data.errors) this.invalidateInputs(r.data.errors)
              notify && toastr.error(r.data.statusText || 'fail')
            }
          else {
            if (this.invalidateInputs) if (r.data.errors) this.invalidateInputs(r.data.errors)
            notify && toastr.error(r.statusText || 'fail')
          }

          last_button && setTimeout(() => last_button.disabled = false, 1000)
          resolve(r)
        }).catch((r) => {
          if (this.$root.$refs.app) if (this.$root.$refs.app.$refs.lt) this.$root.$refs.app.$refs.lt.hide()
          if (notify)
            toastr.error(r.message || 'fail')

          last_button && setTimeout(() => last_button.disabled = false, 1000)
          reject(r)
        })
      })
    },
    scrollToBot: function (el, scrollDuration = 1000) {
      const scrollHeight = el.scrollHeight - el.scrollTop - el.clientHeight,
        scrollStep = Math.PI / (scrollDuration / 15),
        cosParameter = scrollHeight / 2
      let scrollCount = 0,
        scrollMargin,
        scrollInterval = setInterval(function () {
          if (el.scrollTop < el.scrollHeight - el.clientHeight) {
            scrollCount = scrollCount + 1
            scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep)
            el.scrollTo(0, el.scrollHeight - (scrollHeight - scrollMargin + el.clientHeight - 1))
          } else clearInterval(scrollInterval)
        }, 15)
    },
    tc: function (str, returnOfError = undefined) {
      try {
        let e = eval(str)
        if (typeof e === 'function')
          return e()
        else return e
      } catch (e) {
        return returnOfError
      }
    },
  },
  filters: {
    // money: function (value) {
    //     return new Intl.NumberFormat('tr', { style: 'currency', currency: 'TRY', currencyDisplay: 'symbol' }).format(isNaN(value) ? 0 : value)
    // },
  }
}
