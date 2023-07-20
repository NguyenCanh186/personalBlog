<template>
  <div
      class="py-4 p-st"
      style="background-color: #cbe9ff"
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
        >TẠI SAO CHỌN </span
        > <span class="title text-center"><strong style="color: #d54444"> VMG</strong></span>
        <p>Định hướng là một doanh nghiệp quốc tế với các dịch vụ B2B, VMG luôn xây dựng <br> chất lượng dịch vụ khách hàng thật tốt nhằm đáp ứng các yêu cầu dù là cao nhất.</p>
      </div>
      <hr
          width="50%"
          :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />

      <div class="image-container">
        <img :src="img" alt="">
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
import Card from "../helpers/Card.vue";
import Modal from "../helpers/Modal.vue";
import DesignModal from "../helpers/DesignModal.vue";
import info from "../../../info";

import { VueTabs, VTab } from "vue-nav-tabs";
import "vue-nav-tabs/themes/vue-tabs.css";

import "vueperslides/dist/vueperslides.css";

export default {
  name: "Portfolio",
  components: {
    Card,
    Modal,
    VueTabs,
    VTab,
    DesignModal,
  },
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      img: info.whyChooseUs,
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
        this.showBtn = "show less";
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
.image-container {
  max-width: 100%; /* Đảm bảo thẻ div chỉ chiếm tối đa 100% chiều rộng của phạm vi cha */
  overflow: hidden; /* Ẩn bất kỳ nội dung nào vượt quá kích thước của thẻ div */
}

.image-container img {
  width: 100%; /* Khi không có giới hạn rõ ràng cho chiều rộng của hình ảnh, nó sẽ tự động co dãn để vừa với thẻ div */
  height: auto; /* Để tự động điều chỉnh chiều cao dựa trên tỷ lệ */
}
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

/deep/ .vue-tabs .nav-tabs {
  border: none;
  font-size: 20px;
  font-weight: 500;
  display: flex;

  justify-content: center;
}

/deep/ .vue-tabs .tabs__link {
  color: #a0a0a0;
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


.dimg:hover .design-img {
  position: relative;
  border-radius: 15px;
  opacity: 0.1;
  cursor: pointer;
}

.dimg:hover .middle {
  opacity: 1;
}

/deep/.vueperslide {
  border-radius: 10px !important;
}
/deep/.vueperslides__parallax-wrapper {
  border-radius: 10px !important;
}

.btn {
  border-color: #2b91af;
  color: #2b91af;
}

.btn:hover {
  background-color: #2b91af;
  border-color: #2b91af;
  color: white;
}

.btn:focus {
  background-color: #2b91af;
  border-color: #2b91af;
  color: white;
}
</style>
