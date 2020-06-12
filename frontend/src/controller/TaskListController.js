export default {

  async getAtividades() {
    
    await this.$http.get('http://localhost:3333/atividades').then(resp => {
      const atividades = resp.body.atividades;
      console.log(atividades);
      
      // this.atividades.map((atividade) => {
      //   if (atividade.endereco_id) {
      //     this.$http.get('http://localhost:3333/atividades/',atividade.endereco_id).then(end => {
      //       console.log(end);
      //     });
      //   }
      // });

    });
  }

}