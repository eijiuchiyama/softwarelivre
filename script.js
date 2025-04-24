const posts = [
  {
    date: '26/02/2025',
    title: 'Tutorial 1',
    content: `Tentei formar uma dupla com um outro aluno chamado Lucas Harada...`
  },
  {
    date: '05/03/2025',
    title: '',
    content: 'Não teve aula por causa do feriado.'
  },
  // ... continue com os demais
];

const postsContainer = document.getElementById('posts');

posts.forEach(post => {
  const div = document.createElement('div');
  div.className = 'post';

  const title = post.title ? ` - ${post.title}` : '';
  div.innerHTML = `<h2>${post.date}${title}</h2><p>${post.content}</p>`;
  
  postsContainer.appendChild(div);
});

