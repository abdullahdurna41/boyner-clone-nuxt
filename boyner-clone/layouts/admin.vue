<template>
  <div class="admin-layout-wrapper">
    <OrganismsAdminSidebar />
    <OrganismsAdminHeader />
    
    <main class="admin-main-content">
      <slot />
    </main>
  </div>
</template>

<style>
/* Admin body background */
body {
  background-color: #f8f9fa;
}
</style>

<style scoped>
.admin-main-content {
  margin-left: 260px; /* Sidebar width */
  padding: 110px 40px 40px 40px; /* Top padding = Header height + space */
  min-height: 100vh;
}
</style>