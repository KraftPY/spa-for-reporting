<template>
    <ul class="reports_list">
      <router-link to="/" exact active-class="active">
        <li>Reports</li>
      </router-link>
      <router-link to="/save-reports" active-class="active">
        <li>Saved reports</li>
      </router-link>
       <router-link to="/create-report" active-class="active">
        <li>Create report</li>
      </router-link>
    </ul>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.reports_list {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  list-style: none;
}

.reports_list a {
  padding: 0 1rem;
  font-size: 2rem;
}

.reports_list a:not(:last-child) {
  border-right: 0.1rem solid black;
}

.reports_list a:hover {
  text-decoration: underline;
}

.reports_list a.active {
  font-weight: bold;
}
</style>