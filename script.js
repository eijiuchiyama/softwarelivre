const posts = [
  {
    color:'darkgreen',
    date: '26/02/2025',
    title: 'Tutorial 1',
    content: `Tentei formar uma dupla com um outro aluno chamado Lucas Harada, com quem fiz o primeiro tutorial da disciplina. Como não havia levado meu notebook no dia, pois não sabia que ele seria necessário, não pude fazer o tutorial 1 em sala de aula. Deixei para fazer em casa, aproveitando o feriado na semana seguinte. Entretanto, não concluí o tutorial, ficando preso na parte de inicializar a máquina virtual.`
  },
  {
    color:'crimson',
    date: '05/03/2025',
    title: '',
    content: 'Não teve aula por causa do feriado.'
  },
  {
    color:'darkgreen',
    date: '12/03/2025',
    title: 'Tutorial 2',
    content: `Nessa semana recebi a notícia que minha dupla não continuaria na disciplina, pois sua matrícula havia sido indeferida. Tinha então que encontrar uma outra dupla para continuar, mas a maioria das duplas já estava formada. Foquei então em me concentrar nos tutoriais e ver uma dupla quando começasse o período de contribuição para o Kernel Linux. Nessa semana consegui terminar o tutorial 1 com a ajuda do monitor David, e finalmente consegui inicializar o SO na máquina virtual. 

Nessa semana as duplas que usariam o software kw (que automatiza processos de contribuição para o Kernel Linux) foram escolhidos, sendo a minha dupla uma delas. Iniciei o tutorial 2, mas novamente não consegui terminar por conta de outro problema, dessa vez durante o processo de clonar a árvore do Kernel.`
  },
  {
    color:'darkgreen',
    date: '19/03/2025',
    title: 'Tutorial 3',
    content: `Nessa semana terminei o tutorial 2, finalmente, e iniciei o tutorial 3. Como nas semanas passadas, fiquei preso na metade do tutorial. Neste tutorial, foi criado um novo módulo para o Kernel, demonstrando o processo de compilar um novo módulo. Por algum motivo, meu módulo que copiei para a minha máquina virtual não executava.`
  },
  {
    color:'darkgreen',
    date: '26/03/2025',
    title: 'Tutorial 4',
    content: `O tutorial 4 foi o único tutorial que consegui concluir sem ajuda do monitor na semana seguinte. Também nessa semana consegui resolver o problema do meu computador, que comprei no início do ano e travava em determinados momentos. Descobri que o problema era a incompatibilidade entre o Kernel da minha máquina e o driver da GPU Nvidia. Para resolver, tive que instalar um Kernel mais antigo, com maior compatibilidade, e torná-lo o meu Kernel padrão. `
  },
  {
    color:'darkgreen',
    date: '02/04/2025',
    title: 'Tutorial 5/6',
    content: `Foram passados os tutoriais 5 e 6, mas nao houve tempo de fazer na aula, por conta de uma apresentação do Nelson Lago e de uma transmissão do Marcelo Schmitt, que nos deu as últimas instruções para a criação de patches e seu envio.
Foi aceito pelo professor o meu trio, formado por:
<ul>
	<li>Eu
	<li>Fernando Lima
	<li>Octavio Carneiro
</ul>`
  },
  {
    color:'darkblue',
    date: '09/04/2025',
    title: 'Criação de patch para o Kernel Linux',
    content: `Iniciamos a criação de um patch para o Kernel Linux com base em algumas sugestões do Marcelo Schmitt. Eu e meu grupo escolhemos os seguintes patches:
<b>2.2 - Claim IIO direct mode to avoid interleave register read/write with buffered data capture</b>
<ul>
	<li>drivers/iio/adc/ad4000.c 
	<li>drivers/iio/adc/ti-ads131e08.c 
</ul>
<b>4 - Duplicações de código</b>
<ul>
	<li>pressure/dps310.c
</ul>
No caso, fiquei com o terceiro patch. Infelizmente, não tinha trazido o notebook no dia, então me atrasei um pouco no projeto. Em relação ao patch escolhido, realizei a remoção de duplicações entre as funções de temperatura e as funções de pressão, que constituíam basicamente no mesmo código exceto poralgumas constantes. Também criei mais uma macro que ajuntava constantes definidas na compilação, removendo mais uma duplicação.

<b>Macro criada:</b>

<pre><code>
#define DPS310_INFO_MASK (BIT(IIO_CHAN_INFO_OVERSAMPLING_RATIO) | BIT(IIO_CHAN_INFO_SAMP_FREQ) | BIT(IIO_CHAN_INFO_PROCESSED))
</code></pre>

Usada em:

<pre><code>
static const struct iio_chan_spec dps310_channels[] = {
	{
		.type = IIO_TEMP,
		.info_mask_separate = DPS310_INFO_MASK
	},
	{
		.type = IIO_PRESSURE,
		.info_mask_separate = DPS310_INFO_MASK
	},
};
</code></pre>

<b>Exemplo de função criada:</b>

<pre><code>
static int dps310_get_precision(struct dps310_data *data, int *val, int mode)
{
	int reg_val, rc;
	
	if(!mode)
        	rc = regmap_read(data->regmap, DPS310_PRS_CFG, &reg_val);
	else
		rc = regmap_read(data->regmap, DPS310_TMP_CFG, &reg_val);

        if (rc < 0)
                return rc;

		/*
         * Scale factor is bottom 4 bits of the register, but 1111 is
         * reserved so just grab bottom three
         */


        *val = BIT(reg_val & GENMASK(2, 0));

        return 0;
}

</code></pre>

Usada em:

<pre><code>
static int dps310_get_pres_precision(struct dps310_data *data, int *val)
{
	return dps310_get_precision(data, val, 0);
}

static int dps310_get_temp_precision(struct dps310_data *data, int *val)
{
	return dps310_get_precision(data, val, 1);
}

</code></pre>`
  },
  {
    color:'crimson',
    date: '16/04/2025',
    title: '',
    content: 'Não teve aula. Semana da Páscoa.'
  },
  {
    color:'darkblue',
    date: '23/04/2025',
    title: 'Apresentações',
    content: 'Apresentação dos patches feitos duas semanas antes.'
  },
  {
    color: 'indigo',
    date: '30/04/2025',
    title: 'Apresentação das possíveis contribuições para a disciplina',
    content: 'Algumas apresentações de projetos que podemos conribuir na segunda metade da disciplina, incluindo uma do Otávio e Felipe Aníbal sobre o GNOME.'
  },
  {
    color: 'indigo',
    date: '07/05/2025',
    title: 'Decisão de contribuição',
    content: 'Decidimos que contribuiríamos para o Git para uma das ideias presentes no site https://git.github.io/SoC-2025-Microprojects/ para o Google Summer of Code. Tive a ideia de contribuir para um aplicativo do GNOME, como o Monitor do Sistema, em parte porque poderia ter uma ajuda dos antigos alunos da disciplina, mas como meus companheiros de grupo preferiam contribuir com o Git, então decidi acompanhá-los.'
  },
  {
    color: 'indigo',
    date: '14/05/2025',
    title: 'Contribuição para o Git',
    content: `Cada um de nós contribuiu para alguma ideia do Google Summer of Code. No meu caso, fiz uma contribuição simples ao arquivo add-interactive.c, em que retirei o macro #define DISABLE_SIGN_COMPARE_WARNINGS e corrigi os warnings decorrentes dessa alteração. Na maioria dos casos, foi necessário apenas converter uma variável com o tipo unsigned int ou unsigned long int para long int. Por exemplo:
     
<pre><code>
for (i = 0; i < (long int)(list->nr); i++) {

</code></pre>
    
Recebi uma resposta do mantenedor (Junio C Hamano) em relação ao meu patch:
    
<pre><code>
Lucas Eiji <lucaseiji54@gmail.com> writes:

From: Eiji Uchiyama <eijiuchiyama@github.com>
> 
>This is an initial contribution to git, based on the SoC 2025 ideas
> for microprojects. It removes the DISABLE_SIGN_COMPARE_WARNINGS macro and
> solves the warnings generated by running make DEVELOPER=1 -j4

Your first sentence is not something you want to carve in stone as
part of the official history, and should not be part of the proposed
commit log message.  Yet, it is very nice of you to tell your
reviewers that you are the first-time contributor and may want extra
help by community members.  If you want to do so, do it below the
three-dash line that is between the proposed log message and the
diffstat.

The usual way to compose a log message of this project is to

 - Give an observation on how the current system works in the
   present tense (so no need to say "Currently X is Y", or
   "Previously X was Y" to describe the state before your change;
   just "X is Y" is enough), and discuss what you perceive as a
   problem in it.

 - Propose a solution (optional---often, problem description
   trivially leads to an obvious solution in reader's minds).

 - Give commands to the codebase to "become like so".

in this order.  I would expect to see something along the lines of ...

    Subject: [PATCH] add-interactive.c: squelch -Wsign-compare warnings

    A handful of functions in add-interactive.c compare .nr member
    of a string_list structure (which is of type size_t) with a
    local variable (which often is of type int), and triggers
    compiler warnings due to -Wsign-compare being part of the
    developer configuration.

    Squelch them by DOING THIS AND THAT.

... but I'll refrain from filling the "DOING THIS AND THAT" part.

> -     else if (index + 1 < list->sorted.nr &&
> +     else if (index + 1 < (long int)(list->sorted.nr) &&

Well, by sprinkling casts all over the place, you can squelch almost
any compiler warnings, but the real question you should ask is: is
it making the code more correct, or at least not worse?

For example, what does the above code do on a platform where size_t
is 64-bit unsigned integer, and "long int" is 32-bit signed integer?
For those who are reading from sidelines, "index" here is "int".

Very locally on this line, I think the more correct fix may be to
declare that "index" is of type "size_t" (not "int").  We may also
have to barf when "index + 1" overflows "size_t".

But do not go there yet.

I think the real culprit is that string_list is misdesigned in that
most of the code there work with platform natural "int" type
(e.g. get_entry_index() that looks for the location in the array for
a given string does bisection using "int", add_entry() that returns
where in the array of strings it inserted the new one using "int",
string_list_find_insert_index() that finds an existing entry or the
location a new entry should be inserted into uses "int"), yet it
declares the size of the array of the string using "size_t".

Those index-yielding API functions (and internal implementation
details) in string_list should be using "size_t" to express where in
the array they want to point at, or "int" that may be a lot shorter
(and has only half the range of "unsigned" on the positive side)
would never be adequate.  Or change the .nr member to "int" (of
course, the code that grows the array must be careful not to
overflow .nr and let it wraparound---but the code must be careful no
matter what type it is; declaring "size_t nr;" alone does not fix
anything).

The string_list API must be fixed first before fixing the calling
programs like this one, I would think.

I'll stop here, as all the other changes to this file were due to
the misdesign of the string_list API.

Please do not get discouraged by our code being sloppy and GSoC
microproject ideas page being under-specified.  Neither is your
fault.

And welcome to Git development community.

[Footnote]

Quite honestly, -Wsign-compare is mostly garbage [*] and I wish we
did not add it to the developer settings.  A more effective way to
squelch them is not by sprinkling the casts like this, but to remove
it from config.mak.dev ;-)

https://staticthinking.wordpress.com/2023/07/25/wsign-compare-is-garbage/

</code></pre>

Dada esta resposta, ainda tenho que consertar meu patch e mandar novamente para conseguir que ele seja aprovado. Pretendo fazer isso na semana seguinte. Se não for possível, vou partir para outra contribuição.`
	},
	{
		color:'indigo',
		date:'21/05/2025',
		title:'Novas apresentações',
		content:'Novo pitch sobre os novos patches para projetos do ecossistema Linux.'
	},
	{
		color:'crimson',
    	date: '28/05/2025',
    	title: '',
    	content: 'Não teve aula. Segundo break.'
	},
	{
		color:'darkmagenta',
    	date: '04/06/2025',
    	title: 'Instalação do Debian',
    	content: 'Última apresentação sobre software livre e videoconferência com dois contribuidores do Debian. Instalação de imagem do Debian no QEMU. Tivemos que modificar o arquivo de ativação e criar um novo espaço para o sistema operacional.'
	},
	{
		color:'darkmagenta',
    	date: '11/06/2025',
    	title: 'Contribuição para o Debian',
    	content: 'Continuação da videoconferência com o pessoal do Debian e commit para o repositório do Debian.'
	}
	,
	{
		color:'darkmagenta',
    	date: '18/06/2025',
    	title: 'Início das apresentações finais',
    	content: `Apresentação de quatro duplas sobre as realizações deste semestre na segunda metade da aula, enquanto ocorre a preparação para a apresentação na primeira metade. Os demais do meu trio não vieram. Fiquei responsável em representar o grupo.
    	Nossa contribuição foi aceita:
    	
<pre><code>
Thank you for your contribution to Debian.



Accepted:

-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

Format: 1.8
Date: Wed, 11 Jun 2025 19:02:55 +0000
Source: golang-github-prometheus-client-golang
Architecture: source
Version: 1.21.1-2~exp1
Distribution: experimental
Urgency: medium
Maintainer: Debian Go Packaging Team <team+pkg-go@tracker.debian.org>
Changed-By: eijiuchiyama <eijiuchiyama@usp.br>
Changes:
 golang-github-prometheus-client-golang (1.21.1-2~exp1) experimental; urgency=medium
 .
   * Team upload.
   * d/control: bump standards version to 4.7.2
Checksums-Sha1:
 e5826eca96b9e77dd5f32ec5b340c7de3798273a 2900 golang-github-prometheus-client-golang_1.21.1-2~exp1.dsc
 1c49a7cca81e0061584fa8ac2f08a8a37f79ab91 1095404 golang-github-prometheus-client-golang_1.21.1.orig.tar.gz
 c9a3b026b621e3e11e4886e16d9a431793783669 9212 golang-github-prometheus-client-golang_1.21.1-2~exp1.debian.tar.xz
Checksums-Sha256:
 e58ce9e42330e28afb8ec8a9171db07e2218bb7b8c086bc7d4dada127385437c 2900 golang-github-prometheus-client-golang_1.21.1-2~exp1.dsc
 9e34682ae79f80eb17afe73d1d7800574af63d63af5c4a0be859751e07446b42 1095404 golang-github-prometheus-client-golang_1.21.1.orig.tar.gz
 c3d2d6438f3b894293f6d352d93891588c2e87a68eba1c3a0139139ac7a5c5c9 9212 golang-github-prometheus-client-golang_1.21.1-2~exp1.debian.tar.xz
Files:
 fb3633a7fd4137d4a4ef8a4c7d66980c 2900 golang optional golang-github-prometheus-client-golang_1.21.1-2~exp1.dsc
 59a124718230beae8e4f08893fe1443b 1095404 golang optional golang-github-prometheus-client-golang_1.21.1.orig.tar.gz
 3632c58c0830eb573566ead0d8ac1074 9212 golang optional golang-github-prometheus-client-golang_1.21.1-2~exp1.debian.tar.xz

-----BEGIN PGP SIGNATURE-----

iQJJBAEBCgAzFiEEjtbD+LrJ23/BMKhw+COicpiDyXwFAmhMc6MVHGthbmFzaGly
b0BkZWJpYW4ub3JnAAoJEPgjonKYg8l8LwoP/0hPKqyh7HtkU/sNTU8Nhh88SKMb
XqXw5YqlykCIcQCczxG4pmp4UoS/CV06JoQ8K2oC4EeJtFBKlRdeA1S08Q+YPnSX
63i6ODUI0xhYTAxcKMyDTAL7HPmnpfcXF3fUhc8eidW0R2inKD/wVEWt0IpbdukQ
8oYlAGtX19bC09AJ1QPvOWQjwWqHN4BexUEYGQtzvKcnv6uE5dmclKfRtKmp4FsN
9gbk/2te9bm+iqZiAjhg0hPFJEm3TEaFMGjQqptc/1Z5Aimwni+nPNAxGaFvguFZ
JeEXMnBE9M2oo+24gr4/eaY/LYt0OAy14yDgjuzydXVn6GtGnw38ojqvaH9lJ1gT
/fNp/xidkillgvem2rN0Zv5FHTqdLFaL7fvo15feKhC34B7SuU8VwnWbqGPM8V47
sQHsD6L2CWwynyJLjDgcbT0b40WbGni2c49Z07qX+/yCIlx8aTURidO7ihw9U3aM
SkM4lDUmWR9OlG6SaureT2bQvTW0A1oH3UANTpLpelf0HG4KBGUDeaKz64uJ83oU
z8LPFllfdchX3TfnGyTlhe7edMMndiWY7AwRcfNOdxXemKth5yXMSRrPNhktJ6sL
ca0+BevuWFnpedBoIuG9Vg1LsABtKWvRXd+RZD9JbTiv2Jlw7oL7DIIGdCkAXngg
McVAG56P8QJbZUSf
=qV/5
-----END PGP SIGNATURE-----
</code></pre>

Infelizmente, em relação ao nosso código da nossa contribuição para o kernel linux, eu perdi a modificação por conta de algum problema.
`
	},
	{
		color:'darkmagenta',
    	date: '25/06/2025',
    	title: 'Apresentações finais',
    	content: 'Apresentação dos demais grupos, inclusive do nosso. Consegui as modificações feitas no dps310.c através do Fernando, mas não pude inserir a tempo, devido à grande quantidade de atividades a serem feitas no fim do semestre.'
	}
];

const postsContainer = document.getElementById('posts');

// Função para extrair mês e ano da data (formato DD/MM/YYYY)
function getMonthYear(dateStr) {
  const [day, month, year] = dateStr.split('/');
  return `${month}/${year}`; // exemplo: "06/2025"
}

// Agrupa os posts por mês/ano
const postsByMonth = posts.reduce((acc, post) => {
  const key = getMonthYear(post.date);
  if (!acc[key]) acc[key] = [];
  acc[key].push(post);
  return acc;
}, {});

// Agora renderiza agrupado por mês
for (const monthYear in postsByMonth) {
  const monthDiv = document.createElement('div');
  monthDiv.className = 'month-group';

  // Colocar um título para o mês (ex: Junho/2025)
  // Opcional: pode criar uma função para converter '06' em 'Junho'
  const [month, year] = monthYear.split('/');
  const monthName = new Date(year, month - 1).toLocaleString('pt-BR', { month: 'long' });
  const monthTitle = document.createElement('h1');
  monthTitle.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} / ${year}`;
  monthDiv.appendChild(monthTitle);

  // Criar os posts desse mês
  postsByMonth[monthYear].forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';

    const title = post.title ? ` - ${post.title}` : '';
    div.innerHTML = `<h2>${post.date}${title}</h2><p>${post.content}</p>`;

    div.style.backgroundColor = post.color;
    
    monthDiv.appendChild(div);
  });

  postsContainer.appendChild(monthDiv);
}

