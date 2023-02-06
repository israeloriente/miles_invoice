<template>
  <div class="invoice">
    <img class="invoice-logo" draggable="false" src="../assets/logo.png" />
    <div class="info-company-1">
      <p>Company Name</p>
      <p>Address Name</p>
      <p>Contribuinte:</p>
      <p>E-mail:</p>
      <p>Tlm:</p>
    </div>
    <div class="info-company-2">
      <p>Company Name</p>
      <p>Address Name</p>
      <p>Contribuinte:</p>
      <p>E-mail:</p>
      <p>Tlm:</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.info-company {
  &-1 {
    position: absolute;
    text-align: start;
    width: 250px;
    margin: 2%;
    border: 1px solid #000;
  }
  &-2 {
    right: 180px;
    border: 1px solid #000;
    position: absolute;
    text-align: start;
    width: 250px;
    margin: 2%;
  }
  p {
    font-size: 13px;
  }
}
.invoice {
  margin: auto;
  width: 210mm;
  height: 297mm;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 50px;
  &-logo {
    width: 80px;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
