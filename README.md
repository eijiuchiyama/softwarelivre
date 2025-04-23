# Software Livre 2025 - Lucas Eiji Uchiyama

Repositório para blog da disciplina de Desenvolvimento de Software Livre 2025, onde são postadas informações sobre o andamento do projeto.

## Anteriormente

Tentei formar uma dupla com um outro aluno chamado Lucas Harada, com quem fiz o primeiro tutorial da disciplina. Porém, ele acabou saindo da disciplina por conta de sua matrícula ter sido indeferida. 
Continuei por um tempo fazendo os tutoriais sem uma dupla, tentando focar em praticar.

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

### 4 - duplicações de código

- pressure/dps310.c

No caso, fiquei com o terceiro patch. Em relação a ele, realizei a remoção de duplicações entre as funções de temperatura e as funções de pressão, que constituíam basicamente no mesmo código exceto por
algumas constantes. Também criei mais uma macro que ajuntava constantes definidas na compilação, removendo mais uma duplicação.




