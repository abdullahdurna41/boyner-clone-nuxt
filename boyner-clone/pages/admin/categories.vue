<template>
  <div class="admin-categories">
    <h1 class="page-title">Kategori Yönetimi (3. Tablo)</h1>

    <div class="wrapper">
      <div class="add-box">
        <input v-model="newCatName" placeholder="Yeni Kategori Adı (Örn: Çanta)" @keyup.enter="handleAdd" />
        <button @click="handleAdd">EKLE</button>
      </div>

      <div class="list-box">
        <h3>Mevcut Kategoriler</h3>
        <ul>
          <li v-for="cat in categoryStore.categories" :key="cat.id">
            <span>{{ cat.name }}</span>
            <button class="del-btn" @click="categoryStore.deleteCategory(cat.id)">Sil</button>
          </li>
        </ul>
        <p v-if="categoryStore.categories.length === 0">Hiç kategori yok.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const categoryStore = useCategoryStore()
const newCatName = ref('')

onMounted(() => {
  categoryStore.fetchCategories()
})

const handleAdd = async () => {
  if (!newCatName.value) return
  await categoryStore.addCategory(newCatName.value)
  newCatName.value = ''
}
</script>

<style scoped>
.admin-categories { padding: 20px; }
.wrapper { display: flex; gap: 30px; margin-top: 20px; }
.add-box { display: flex; gap: 10px; align-items: flex-start; }
input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
button { padding: 10px 20px; background: #2b2b38; color: white; border: none; cursor: pointer; border-radius: 4px; }
.list-box { flex: 1; background: white; padding: 20px; border-radius: 8px; }
ul { list-style: none; padding: 0; }
li { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; }
.del-btn { background: red; padding: 5px 10px; font-size: 12px; }
</style>