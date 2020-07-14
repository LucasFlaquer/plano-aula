<template>
  <div>
    <div class="form-group list--form">
      <label for="competencia">adicionar nova</label>
      <input class="form-control" type="text" name="competencia" id="competencia" v-model="newItem">
      <b-button @click.prevent="addItem">Adicionar {{list_name}}</b-button>
    </div>
    <ul class="list">
      <li class="list--item" :id="`item-${index}`" v-for="(item, index) in list" :key="index" ref="item">
        <div class="list--content">
          <label v-if="editingIndex!=index" for="">{{item}}</label>
          <input v-show="editingIndex==index"
          type="text" 
          v-model="editItem"
          v-item-focus="item == editItem"
          class="edit"
          @keyup.esc="cancelUpdate">
          <div class="list--buttons">
            <template v-if="editingIndex!=index">
              <b-button variant="info" @click="updateItem(index,item)">
                <b-icon icon="pencil"></b-icon>
              </b-button>
              <b-button @click="removeItem(item)" variant="danger">
                <b-icon icon="trash-fill"></b-icon>
              </b-button>
            </template>
            <template v-else>
              <b-button variant="info" @click="confirmUpdate(index,item)">
                <b-icon icon="check"></b-icon>
              </b-button>
              <b-button variant="danger" @click="cancelUpdate">
                <b-icon icon="x-circle"></b-icon>
              </b-button>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ListControl',
    props: {
      initialList: {
        type: Array,
        default: ()=>[],
      },
      list_name: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        newItem: '',
        editingIndex: -5,
        editItem: '',
        list:[]
      }
    },
    methods: {
      addItem() {
        if(this.newItem.length > 0) {
          this.list.push(this.newItem)
          this.newItem = ''
        } else {
          this.required = true
        }
      },
      updateItem(index,item) {
        this.editingIndex = index
        this.editItem = item
      },
      confirmUpdate(index, item) {
        this.list[index] = this.editItem
        this.editingIndex = -5
        this.editItem = ''
        this.$emit('updateList', {list_name: this.list_name, items:this.list})
      },
      cancelUpdate() {
        this.editItem = ''
        this.editingIndex = -1
      },
      removeItem(item) {
        const list = this.list.splice(this.list.indexOf(item), 1)
      }
    },
    watch: {
      // list: {
      //   handler(list) {
      //     this.$emit('updateList', {list_name: this.list_name, items:this.list})
      //   },
      //   deep:true
      // }
    },
    directives: {
      "item-focus":function(el, binding) {
        if(binding.value) {
          el.focus()
        }
      }
    },
    created() {
      if(this.initialList.length>0)
        this.list = this.initialList
    }
  }
</script>

<style lang="scss">
  .list {
    padding:15px;
    border-radius: 5px;
    min-height: 160px;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #464343;
    // background-color: #58a8d6;
    list-style: none;
    // color: #fff;
    li {
      border-bottom: 1px solid #464343;
      margin-bottom: 5px;
    }
    font-size: 18px;
    &--content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;

      input {
        padding: 4px 10px;
        max-width: 70%;
        /* max-height: 28px; */
        line-height: 16px;
        position: relative;
        margin: 0;
        font-size: 18px;
        /* font-family: inherit; */
        /* font-weight: inherit; */
        line-height: 1.4em;
        border: 0;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
      }
    }
    &--buttons {
      .btn {
        padding: 5px;
        font-size: 0.6em;
        &:first-child {
          margin-right: 15px;
        }
      }
    }

    &--form {
      .btn {
        margin-top: 15px;
      }
    }
  }
</style>