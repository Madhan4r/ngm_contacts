<template>
  <div>
    <CNavbar expandable="md" color="white" fixed="bottom">
      <div class="row pl-2 w-100 justify-content-between">
        <div>
          <fas-icon :icon="['fas', 'copyright']"></fas-icon> BCA Department
        </div>
        <div class="d-flex">
          <a href="https://madhan4r.github.io/ngm_contacts/" target="_blank">
            <CIcon name="cibGithub" class="mb-1" style="color: #3c4b64" />
          </a>
        </div>
      </div>
    </CNavbar>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>
