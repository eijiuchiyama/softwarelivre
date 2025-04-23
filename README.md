# Software Livre 2025 - Lucas Eiji Uchiyama

Repositório para blog da disciplina de Desenvolvimento de Software Livre 2025, onde são postadas informações sobre o andamento do projeto.

## Anteriormente

Tentei formar uma dupla com um outro aluno chamado Lucas Harada, com quem fiz o primeiro tutorial da disciplina. Porém, ele acabou saindo da disciplina por conta de sua matrícula ter sido indeferida. Continuei por um tempo fazendo os tutoriais sem uma dupla, tentando focar em praticar e lembrar do processo de criação de um novo patch.

## 02/04/2025

Foi aceito pelo professor o meu trio, formado por:

- Eu

- Fernando Lima

- Octavio Carneiro

## 09/04/2025

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


