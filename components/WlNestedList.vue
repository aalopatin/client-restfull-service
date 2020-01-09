<template>
  <draggable class=" list-group list-group-flush" tag="ul" :list="items" :group="group" :clone="clone">
    <li class="list-group-item" v-for="(item, idx) in items" :key="item[field]">
      <b-row>
        <b-col v-if="nested" cols="1">
          <b-btn v-b-toggle="prefix + parentIdx + '_' + idx" variant="link" size="sm">
            <span class="when-opened">
              <font-awesome-icon icon="angle-down" />
            </span>
            <span class="when-closed">
              <font-awesome-icon icon="angle-right"></font-awesome-icon>
            </span>
          </b-btn>
        </b-col>
        <b-col>
          <div>{{ item[field] }}</div>
        </b-col>
        <b-col v-if="deleteButton" cols="1">
          <font-awesome-icon icon="times" @click="removeAt(idx)"></font-awesome-icon>
        </b-col>
      </b-row>
      <b-collapse v-if="nested" :id="prefix + parentIdx + '_' + idx">
        <wl-nested-list
          class="dragArea"
          :class="{'dragAreaEmpty':item[child].length === 0}"
          :items="item[child]"
          :field="field"
          :child="child"
          :parent-idx="parentIdx + '_' + idx"
          :group="group"
          :clone="clone"></wl-nested-list>
      </b-collapse>
    </li>
  </draggable>
</template>

<script>

  import draggable from "vuedraggable"

  export default {
    name: "wl-nested-list",
    components: {
      draggable
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      field: {
        type: String,
        default: 'name'
      },
      child: {
        type: String,
        default: 'child'
      },
      prefix: {
        type: String,
        default: 'collapse'
      },
      parentIdx: {
        type: String,
        default: ''
      },
      group: {
        type: Object | String,
      },
      clone: {
        type: Function,
        default: original => {
          return original;
        }
      },
      nested: {
        type: Boolean,
        default: true
      },
      deleteButton: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      removeAt(idx) {
        this.items.splice(idx, 1);
      }
    }
  }
</script>

<style scoped>
  .dragAreaEmpty {
    min-height: 50px;
    outline: 1px dashed;
  }
  .collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
    display: none;
  }
</style>
