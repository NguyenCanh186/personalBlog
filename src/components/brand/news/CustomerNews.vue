<template>
  <div
      class="py-4 p-st"
      :class="{
      'bg-light': !nightMode,
      'bg-dark2': nightMode,
      'text-light': nightMode,
    }"
  >
    <div class="container">
      <div
          class="text-center"
          data-aos="fade"
          data-aos-once="true"
          data-aos-duration="1000"
      >
        <span
            class="title text-center"
            :class="{ pgray: !nightMode, 'text-light': nightMode }"
        >
          Tin khách hàng
        </span>
      </div>
      <hr
          width="50%"
          :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />

      <br />
      <div class="row">
        <div
            class="col-xl-4 col-bg-4 col-md-6 col-sm-12"
            v-for="(portfolio, idx) in portfolio_info"
            :key="portfolio.name"
            @click="showModalDetail(portfolio.id)"
        >
          <div class="card-container"> <!-- Thêm container và lớp CSS vào đây -->
            <Card
                :style="{ 'transition-delay': (idx % 3) / 4.2 + 's' }"
                :portfolio="portfolio"
                @show="showModalFn"
                data-aos="fade-up"
                :nightMode="nightMode"
                data-aos-offset="100"
                data-aos-delay="10"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
            />
          </div>
        </div>
      </div>
      <div class="text-center py-3">
        <button class="btn mr-2" v-if="number < all_info.length" @click.prevent="showMore">Xem tiếp</button>
        <button class="btn" v-if="number > 3" @click.prevent="showLess">Thu gọn</button>
      </div>
    </div>
    <transition name="modal">
      <Modal
          :showModal="showModal"
          @close="closeModal"
          v-if="showModal"
          :portfolio="modal_info"
          :nightMode="nightMode"
      />
    </transition>
    <transition name="modal">
      <DesignModal
          :showModal="showDesignModal"
          @close="closeModal"
          v-if="showDesignModal"
          :portfolio="design_modal_info"
          :nightMode="nightMode"
      />
    </transition>
  </div>
</template>

<script>
import Card from "../../helpers/Card.vue";
import Modal from "../../helpers/Modal.vue";
import DesignModal from "../../helpers/DesignModal.vue";
import info from "../../../../info";

import "vue-nav-tabs/themes/vue-tabs.css";

import "vueperslides/dist/vueperslides.css";

export default {
  name: "PromotionsNews",
  components: {
    Card,
    Modal,
    DesignModal,
  },
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      all_info: info.portfolio,
      desgin_info: info.portfolio_design,
      portfolio_info: [],
      showModal: false,
      showDesignModal: false,
      modal_info: {},
      design_modal_info: {},
      number: 3,
      shower: 0,
      data: [
        '<div class="example-slide">Slide 1</div>',
        '<div class="example-slide">Slide 2</div>',
        '<div class="example-slide">Slide 3</div>',
      ],
    };
  },
  created() {
    for (var i = 0; i < this.number; i++) {
      this.portfolio_info.push(this.all_info[i]);
    }
  },
  watch: {
    number() {
      this.portfolio_info = [];
      for (var i = 0; i < this.number; i++) {
        this.portfolio_info.push(this.all_info[i]);
      }
    },
  },
  methods: {
    showModalDetail(portfolioId) {
      // Navigate to the desired route passing the portfolioId
      console.log(123)
      this.$router.push('/newsDetail/' + portfolioId);
    },
    next() {
      this.$refs.flickity.next();
    },

    previous() {
      this.$refs.flickity.previous();
    },
    closeModal() {
      this.showModal = false;
      this.showDesignModal = false;
      document.getElementsByTagName("body")[0].classList.remove("modal-open");
    },
    showModalFn(portfolio) {
      this.modal_info = portfolio;
      this.showModal = true;
    },
    showDesignModalFn(design_portfolio) {
      this.design_modal_info = design_portfolio;
      this.showDesignModal = true;
    },
    showLess() {
      this.number = 3;
      this.showBtn = "Thu gọn";
    },
    showMore() {
      if (this.number != this.all_info.length) {
        this.number += 3;

        window.scrollBy({
          top: document.getElementsByClassName("smcard")[0].clientHeight,
          behavior: "smooth",
        });

        if (this.number > this.all_info.length)
          this.number = this.all_info.length;
      }

      if (this.number == this.all_info.length && this.shower == 0) {
        this.shower = 1;
        this.showBtn = "Thu gọn";
      } else if (this.number == this.all_info.length && this.shower == 1) {
        var elementPosition = document.getElementById("portfolio").offsetTop;
        window.scrollTo({ top: elementPosition + 5, behavior: "smooth" });
        this.shower = 0;
        this.number = 3;
        this.showBtn = "Xem thêm";
      }
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
  font-weight: 500;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.btn {
  border-color: #8585ad;
  color: #8585ad;
}

.btn:hover {
  background-color: #8585ad;
  border-color: #8585ad;
  color: white;
}

.btn:focus {
  background-color: #8585ad;
  border-color: #8585ad;
  color: white;
}

/deep/ .vue-tabs .nav-tabs > li.active > a {
  background: transparent;
  border: none;
  transition: all 0.5s;
  padding-right: 0;
  padding-left: 0;
  margin-right: 15px;
  margin-left: 15px;
}

/deep/ .vue-tabs .nav-tabs > li > a:hover {
  background: transparent;
  color: #cbcbcb;
  transition: all 0.5s;
}

/deep/ .vue-tabs .nav-tabs > li > a {
  background: transparent;
  border: none;
  transition: all 0.5s;
}

/deep/ .vue-tabs .nav-tabs > li > a:after {
  content: "";
  width: 20%;
  position: absolute;
  bottom: 3px;
  border-width: 0 0 2px;
  border-style: solid;
  transition: all 0.5s;
}

/deep/ .vue-tabs .nav-tabs > li.active > a:after {
  width: 100%;
  transition: all 0.5s;
}

.btn {
  border-color: #17a2b8;
  color: #17a2b8;
}

.btn:hover {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
}

.btn:focus {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
}
.card-container {
  transition: opacity 0.3s ease;
}

.card-container:hover {
  opacity: 0.5;
}
</style>
