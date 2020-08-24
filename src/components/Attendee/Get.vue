<template>
  <div class="content-wrapper">
    <app-breadcrumb folder="Tasks" action=" "></app-breadcrumb>
    <div class="row grid-margin">
      <div class="col-lg-9">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Tasks
              <button class="btn btn-primary" @click="openModal('addTask')">
                <span class="mdi mdi-plus"></span>
              </button>

              <p align="center">{{searchString}}</p>
            </h4>
            <p class="card-description"></p>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody name="list" is="transition-group">
                  <app-task
                    v-for="task in tasks"
                    :key="task.id"
                    :details="task"
                    v-on:att-delete="removeTask($event)"
                  ></app-task>
                </tbody>
              </table>
            </div>
            <div v-if="loader">
              <span class="mdi mdi-spin mdi-loading"></span>
            </div>
            <div v-if="tasks && tasks.length == 0">
              <p class="label label-danger">Empty</p>
            </div>
            <nav>
              <ul
                class="pagination flex-wrap pagination-flat pagination-success d-flex justify-content-end"
              >
                <li class="page-item" v-show="page!=1">
                  <a class="page-link" @click="getTasks(1)">
                    <i class="mdi mdi-chevron-left"></i>
                  </a>
                </li>
                <li class="page-item" v-if="page-2>0">
                  <a class="page-link" @click="getTasks(page-2)">{{page-2}}</a>
                </li>
                <li class="page-item" v-if="page-1>0">
                  <a class="page-link" @click="getTasks(page-1)">{{page-1}}</a>
                </li>
                <li class="page-item active">
                  <a class="page-link">{{page}}</a>
                </li>
                <li class="page-item" v-if="page+1<lastPage">
                  <a class="page-link" @click="getTasks(page+1)">{{page+1}}</a>
                </li>
                <li class="page-item" v-if="page+2<lastPage">
                  <a class="page-link" @click="getTasks(page+2)">{{page+2}}</a>
                </li>
                <li class="page-item" v-if="page!=lastPage">
                  <a class="page-link" @click="getTasks(lastPage)">
                    <i class="mdi mdi-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Sort</h4>
            <div class="row">
              <div class="col-lg-12">
                <p class="card-description">Search</p>
                <div class="row">
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="search" />
                  </div>
                  <div class="col-sm-2">
                    <button type="submit" class="btn btn-primary" @click="getTasks(1)">
                      <span class="mdi mdi-magnify"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      name="addTask"
      height="auto"
      :scrollable="true"
      :adaptive="true"
      overlayTransition="nice-modal-fade"
    >
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Create a new Task</h4>
          <form class="forms-sample" enctype="multipart/form-data" @submit.prevent="addTask">
            <div class="form-group">
              <label for="exampleInputUsername1">Title</label>
              <input type="text" class="form-control" v-model="formDetails.title" required />
            </div>
            <div class="form-group">
              <label for="exampleInputUsername1">Description</label>
              <textarea type="text" class="form-control" v-model="formDetails.description" required></textarea>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button type="submit" class="btn btn-primary mr-2 float-right">
                  Submit
                  <div v-if="addLoader">
                    <span class="mdi mdi-spin mdi-loading"></span>
                  </div>
                </button>
                <button class="btn btn-danger" @click.prevent="closeModal('addTask')">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Breadcrumb from "./../Utils/Breadcrumb";
import axios from "axios";
import STask from "./STask";
require("./../../axios");
export default {
  data() {
    return {
      formDetails: {
        title: null,
        description: null,
      },
      tasks: null,
      page: 1,
      lastPage: 1,
      search: "",
      searchString: "",
      loader: false,
      addLoader: false,
    };
  },
  async created() {
    this.getTasks(1);
  },

  methods: {
    getTasks: function (pageNum) {
      this.loader = true;
      this.tasks = null;
      axios
        .get(
          process.env.VUE_APP_BACKEND +
            "tasks?" +
            "page=" +
            pageNum +
            "&search=" +
            this.search
        )
        .then((response) => {
          if (this.search.trim() != "") {
            this.searchString = "Searched For " + this.search;
          }
          if (response.data.status == 0) {
            this.tasks = response.data.data;
            this.page = pageNum;
            this.lastPage = response.data.last_page;
          } else if (response.data.status == 1) {
            this.$swal.fire("", "Tasks list empty. Add a new Task", "error");
            this.addLoader = false;
          } else {
            this.$swal.fire("", response.data.message, "error");
          }
          this.loader = false;
        })
        .catch((err) => {
          this.$swal.fire("", err.message, "error");
          this.loader = false;
        });
    },
    removeTask: function (id) {
      const position = this.tasks.findIndex((task) => {
        return id == task.id;
      });

      this.tasks.splice(position, 1);
    },

    addTask: function () {
      this.addLoader = true;
      axios
        .post(process.env.VUE_APP_BACKEND + "tasks", this.formDetails)
        .then((response) => {
          if (response.data.status == 0) {
            this.$modal.hide("addTask");
            this.$swal.fire("", response.data.message, "success");
            this.getTasks(1);
            this.addLoader = false;
            this.formDetails = {};
          } else {
            this.$swal.fire("", response.data.message, "error");
            this.addLoader = false;
          }
        })
        .catch((err) => {
          this.$swal.fire("", err.message, "error");
          this.addLoader = false;
        });
    },
    openModal: function (name) {
      this.$modal.show(name);
    },
    closeModal: function (name) {
      this.$modal.hide(name);
    },
  },
  components: {
    "app-breadcrumb": Breadcrumb,
    "app-task": STask,
  },
};
</script>

<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-enter, .list-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
