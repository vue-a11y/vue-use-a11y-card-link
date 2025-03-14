<script setup lang="ts">
import { useA11yCardLink } from '../../lib';

const props = defineProps<{
  course: { id: number; title: string; description: string };
}>();

const { props: cardProps } = useA11yCardLink({
  onNavigate: href => window.location.href = href
});
</script>

<template>
  <div v-bind="cardProps" class="card">
    <h2>
      <a :href="`/course/${course.id}`">{{ course.title }}</a>
    </h2>
    <p>{{ course.description }}</p>
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  padding: 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>