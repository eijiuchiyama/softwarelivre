<script>
  const posts = [
    {
      date: '26/02/2025',
      title: 'Tutorial 1',
      content: `Tentei formar uma dupla com um outro aluno chamado Lucas Harada, com quem fiz o primeiro tutorial da disciplina...
      Entretanto, não concluí o tutorial, ficando preso na parte de inicializar a máquina virtual.`
    },
    {
      date: '05/03/2025',
      title: '',
      content: 'Não teve aula por causa do feriado.'
    },
    {
      date: '12/03/2025',
      title: 'Tutorial 2',
      content: `Nessa semana recebi a notícia que minha dupla não continuaria...
      Iniciei o tutorial 2, mas novamente não consegui terminar por conta de outro problema.`
    },
    {
      date: '19/03/2025',
      title: 'Tutorial 3',
      content: `Terminei o tutorial 2 e iniciei o 3. Foi criado um novo módulo para o Kernel...
      meu módulo copiado para a VM não executava.`
    },
    {
      date: '26/03/2025',
      title: 'Tutorial 4',
      content: `Consegui concluir sem ajuda do monitor. Resolvi o problema com o driver da GPU Nvidia...
      Instalei um kernel mais antigo como padrão.`
    },
    {
      date: '02/04/2025',
      title: 'Tutoriais 5 e 6 + Trio',
      content: `Não houve tempo de fazer os tutoriais em aula. Formei um trio com Fernando Lima e Octavio Carneiro.`
    },
    {
      date: '09/04/2025',
      title: 'Criação de patch para o Kernel Linux',
      content: `Escolhemos trabalhar com três patches. Fiquei com o de remoção de duplicações de código em pressure/dps310.c. Criei a macro DPS310_INFO_MASK e a função dps310_get_precision().`
    },
    {
      date: '16/04/2025',
      title: '',
      content: 'Não teve aula. Semana da Páscoa.'
    },
    {
      date: '23/04/2025',
      title: '',
      content: 'Apresentação dos patches feitos duas semanas antes.'
    }
  ];
</script>

<style>
  body {
    font-family: sans-serif;
    background-color: #121212;
    color: #f0f0f0;
    margin: 0;
    padding: 2rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .post {
    background-color: #1e1e1e;
    border: 1px solid #333;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
  }

  .post h2 {
    margin: 0;
    font-size: 1.2rem;
    color: #90caf9;
  }

  .post p {
    white-space: pre-line;
    margin-top: 0.5rem;
  }

  footer {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 2rem;
    color: #aaa;
  }
</style>

<main>
  <h1>Software Livre 2025 - Lucas Eiji Uchiyama</h1>
  {#each posts as post}
    <div class="post">
      <h2>{post.date} {post.title && `- ${post.title}`}</h2>
      <p>{post.content}</p>
    </div>
  {/each}
  <footer>
    &copy; 2025 Lucas Eiji Uchiyama | <a href="https://github.com/SEU_USUARIO/SEU_REPOSITORIO" target="_blank" style="color: #90caf9;">GitHub</a>
  </footer>
</main>

