new Vue({
  el: '#app',
  data: {
    persona: {
    	nombre: '',
    	edad: '',
    	sexo: '',
      descripcion: '',
    },
    personas: [],
    filtro: '',
    vista: 'ingresar',
    mensaje: false,
    index: null
  },
  computed: {
  	personasFiltradas() {
  		return this.personas.filter(p => p.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 || p.edad.indexOf(this.filtro) >= 0);
  	},
  	formOk() {
  		return this.persona.nombre && this.persona.edad && this.persona.sexo && this.persona.descripcion;
  	}
  },
  methods: {
  	agregarPersona() {
  		this.personas.push(Object.assign({}, this.persona));
  		this.limpiarPersona();
  		this.mensaje = true;
      this.savePeopleStorage();
  	},
  	limpiarPersona() {
  		this.persona.nombre = '';
  		this.persona.edad = '';
  		this.persona.sexo = '';
      this.persona.descripcion = '';
      this.index = '';
  	},
  	cambiarVista(vista) {
  		this.vista = vista;
      this.limpiarPersona();
    },
  	cerrarMensaje() {
  		this.mensaje = false;
  	},
    deletePeople(index){
      this.personas.splice(index,1);
      this.savePeopleStorage();
    },
    savePeopleStorage()
    {
      localStorage.setItem('people',JSON.stringify(this.personas));
    },
    getPeopleStorage(){
      const people = localStorage.getItem('people');
      if(people)
      {
        this.personas = JSON.parse(people);
      }
    },
    saveEditing(){
      const index = this.index;
      const persona = this.personas[index];
      this.personas[index].nombre = this.persona.nombre;
      this.personas[index].edad = this.persona.edad;
      this.personas[index].descripcion = this.persona.descripcion;
      this.personas[index].sexo = this.persona.sexo;
      this.cambiarVista('buscar');
      this.savePeopleStorage();
    },

    editPeople(index){
      this.cambiarVista('edit');
      const people = this.personas[index];
      this.persona.nombre = people.nombre;
      this.persona.edad = people.edad;
      this.persona.sexo = people.sexo;
      this.persona.descripcion = people.descripcion;
      this.index = index;
    }
  },
  mounted(){
    this.getPeopleStorage();
  }
})
