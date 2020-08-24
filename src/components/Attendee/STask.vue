<template>
  <tr>
    <td>{{ display.title }}</td>
    <td>{{ display.description }}</td>
    <td>
      <button class="btn btn-info mr-2" @click="openModal()">Edit</button>
      <button class="btn btn-danger" @click="deleteAttendee()">Delete</button>
    </td>
    <modal
      :name="'edit'+ details.id"
      height="auto"
      :scrollable="true"
      :adaptive="true"
      overlayTransition="nice-modal-fade"
    >
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Edit Attendee Details</h4>
          <form class="forms-sample" @submit.prevent="editTask()">
            <div class="form-group">
              <label>Title</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputUsername1"
                v-model="formDetails.title"
                required
              />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea type="text" class="form-control" v-model="formDetails.description" required></textarea>
            </div>

            <div class="row">
              <div class="col-md-12">
                <button type="submit" class="btn btn-primary float-right" :disabled="buttonLoader">
                  <template v-if="!buttonLoader">Submit</template>
                  <span v-else class="mdi mdi-spin mdi-loading"></span>
                </button>
                <button class="btn btn-danger" @click.prevent="closeModal()">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </tr>
</template>
<script>
import axios from "axios";
export default {
  props: ["details"],
  data() {
    return {
      display: this.details,
      formDetails: this.details,
      buttonLoader: false,
    };
  },
  created() {
    this.formDetails.attended_taize_before =
      this.formDetails.attended_taize_before == 1 ? "true" : "false";
    this.formDetails.attended_nyd_before =
      this.formDetails.attended_nyd_before == 1 ? "true" : "false";
  },
  methods: {
    openModal: function () {
      this.$modal.show("edit" + this.details.id);
    },
    closeModal: function () {
      this.$modal.hide("edit" + this.details.id);
    },
    isValid() {
      return (
        this.formDetails.title != null && this.formDetails.description != null
      );
    },
    editTask() {
      if (this.isValid()) {
        this.buttonLoader = true;
        this.$swal
          .fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            // confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: "Proceed",
          })
          .then((result) => {
            if (result.value) {
              axios
                .put(
                  process.env.VUE_APP_BACKEND + "tasks/" + this.details.id,
                  this.formDetails,
                  {
                    timeout: 60000,
                  }
                )
                .then((response) => {
                  if (response.data.status == 0) {
                    this.$swal.fire("", response.data.message, "success");
                    this.display = this.formDetails;
                    this.buttonLoader = false;
                    this.closeModal();
                  } else {
                    this.$swal.fire("", response.data.message, "error");
                    this.buttonLoader = false;
                  }
                })
                .catch((err) => {
                  this.$swal.fire("", err.message, "error");
                  this.buttonLoader = false;
                });
            } else {
              this.buttonLoader = false;
            }
          });
      } else {
        this.$swal.fire("", "Please fill all form fields", "error");
        this.buttonLoader = false;
      }
    },
    deleteAttendee() {
      this.$swal
        .fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          // confirmButtonColor: '#3085d6',
          // cancelButtonColor: '#d33',
          confirmButtonText: "Proceed",
        })
        .then((result) => {
          if (result.value) {
            axios
              .delete(
                process.env.VUE_APP_BACKEND + "tasks/" + this.details.id,
                {
                  timeout: 60000,
                }
              )
              .then((response) => {
                if (response.data.status == 0) {
                  this.$emit("att-delete", this.details.id);
                  this.$swal.fire("", response.data.message, "success");
                } else {
                  this.$swal.fire("", response.data.message, "error");
                }
              })
              .catch((err) => {
                this.$swal.fire("", err.message, "error");
              });
          }
        });
    },
  },
};
</script>
