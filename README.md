# Software Livre 2025 - Lucas Eiji Uchiyama

Repositório para blog da disciplina de Desenvolvimento de Software Livre 2025, onde são postadas informações sobre o andamento do projeto.

## 26/02/2025 (tutorial 1)

Tentei formar uma dupla com um outro aluno chamado Lucas Harada, com quem fiz o primeiro tutorial da disciplina. Como não havia levado meu notebook no dia, pois não sabia que ele seria necessário, não pude fazer o tutorial 1 em sala de aula. Deixei para fazer em casa, aproveitando o feriado na semana seguinte. Entretanto, não concluí o tutorial, ficando preso na parte de inicializar a máquina virtual.

## 05/03/2025

Não teve aula por causa do feriado.

## 12/03/2025 (tutorial 2)

Nessa semana recebi a notícia que minha dupla não continuaria na disciplina, pois sua matrícula havia sido indeferida. Tinha então que encontrar uma outra dupla para continuar, mas a maioria das duplas já estava formada. Foquei então em me concentrar nos tutoriais e ver uma dupla quando começasse o período de contribuição para o Kernel Linux. Nessa semana consegui terminar o tutorial 1 com a ajuda do monitor David, e finalmente consegui inicializar o SO na máquina virtual. 

Nessa semana as duplas que usariam o software kw (que automatiza processos de contribuição para o Kernel Linux) foram escolhidos, sendo a minha dupla uma delas. Iniciei o tutorial 2, mas novamente não consegui terminar por conta de outro problema, dessa vez durante o processo de clonar a árvore do Kernel.

## 19/03/2025 (tutorial 3)

Nessa semana terminei o tutorial 2, finalmente, e iniciei o tutorial 3. Como nas semanas passadas, fiquei preso na metade do tutorial. Neste tutorial, foi criado um novo módulo para o Kernel, demonstrando o processo de compilar um novo módulo. Por algum motivo, meu módulo que copiei para a minha máquina virtual não executava.

## 26/03/2025 (tutorial 4)

O tutorial 4 foi o único tutorial que consegui concluir sem ajuda do monitor na semana seguinte. Também nessa semana consegui resolver o problema do meu computador, que comprei no início do ano e travava em determinados momentos. Descobri que o problema era a incompatibilidade entre o Kernel da minha máquina e o driver da GPU Nvidia. Para resolver, tive que instalar um Kernel mais antigo, com maior compatibilidade, e torná-lo o meu Kernel padrão. 

## 02/04/2025

Foram passados os tutoriais 5 e 6, mas nao houve tempo de fazer na aula, por conta de uma apresentação do Nelson Lago e de uma transmissão do Marcelo Schmitt, que nos deu as últimas instruções para a criação de patches e seu envio..

Foi aceito pelo professor o meu trio, formado por:

- Eu

- Fernando Lima

- Octavio Carneiro

## 09/04/2025 (criação de patch para o Kernel Linux)

Iniciamos a criação de um patch para o Kernel Linux com base em algumas sugestões do Marcelo Schmitt. Eu e meu grupo escolhemos os seguintes patches:

### 2.2 - Claim IIO direct mode to avoid interleave register read/write with buffered data capture

- drivers/iio/adc/ad4000.c 

- drivers/iio/adc/ti-ads131e08.c 

### 4 - Duplicações de código

- pressure/dps310.c

No caso, fiquei com o terceiro patch. Infelizmente, não tinha trazio o notebook no dia, então me atrasei um pouco no projeto. Em relação ao patch escolhido, realizei a remoção de duplicações entre as funções de temperatura e as funções de pressão, que constituíam basicamente no mesmo código exceto poralgumas constantes. Também criei mais uma macro que ajuntava constantes definidas na compilação, removendo mais uma duplicação.

Macro criada:

```
``#define DPS310_INFO_MASK (BIT(IIO_CHAN_INFO_OVERSAMPLING_RATIO) | BIT(IIO_CHAN_INFO_SAMP_FREQ) | BIT(IIO_CHAN_INFO_PROCESSED))
```
Usada em:

```
``static const struct iio_chan_spec dps310_channels[] = {
	{
		.type = IIO_TEMP,
		.info_mask_separate = DPS310_INFO_MASK
	},
	{
		.type = IIO_PRESSURE,
		.info_mask_separate = DPS310_INFO_MASK
	},
};
```
Exemplo de função criada:

```
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
```

Usada em:

```
static int dps310_get_pres_precision(struct dps310_data *data, int *val)
{
	return dps310_get_precision(data, val, 0);
}

static int dps310_get_temp_precision(struct dps310_data *data, int *val)
{
	return dps310_get_precision(data, val, 1);
}
```
## 16/04/2025

Não teve aula. Semana da Páscoa.

## 23/04/2025

Apresentação dos patches feitos duas semanas antes.

