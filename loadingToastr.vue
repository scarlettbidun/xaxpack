<template>
    <transition name="fade">
        <div v-if="store.posting?store.posting.length:false" style="position:fixed;right:0;bottom:0; width:100px;height:100px;">
            <b-spinner style="width: 3rem; height: 3rem;" variant="primary"></b-spinner>
        </div>
    </transition>
</template>

<script>

  export default {
    name: 'loadingToastr',
  }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
