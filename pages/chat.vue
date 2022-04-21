<template>
  <div>
    <button @click="connect">연결</button>
    <!-- message form -->
    <form name="publish" @submit.prevent="sendMessage">
      <input type="text" name="message" v-model="message" />
      <input type="submit" value="Send" />
    </form>
    <div>
      {{ status }}
    </div>
    <!-- div with messages -->
    <div id="messages">
      <h2>메시지</h2>
      <div v-for="(string, idx) in data" :key="idx">
        <li>{{ string }}</li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      socket: null,
      data: [],
      status: "check",
    };
  },
  mounted() {
    // this.$nextTick(() => {});
    this.socket = new WebSocket("ws://localhost:8080/");

    this.socket.onmessage = (event) => {
      console.log("onmessage");
      let message = event.data;
      console.log(message);
      this.data.push(message);
    };

    this.socket.onopen = (e) => {
      this.status = "connect";
      console.log("open");
    };
  },
  methods: {
    sendMessage() {
      this.socket.send(this.message);
      this.message = "";
    },
    connect() {},
  },
};
</script>

<style>
</style>