import { Flex, Heading } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Characteristics from '../components/Characteristics'
import Header from '../components/Header'
import Separator from '../components/Separator'
import Slides from '../components/Slides'
import { client } from '../services/prismic'
import icon from '../../public/logo.svg'

export interface ContinentProps {
  continents: {
    slug: string
    title: string
    summary: string
    image: string
  }[]
}

export default function Home({ continents }: ContinentProps) {
  return (
    <Flex direction="column">
      <Head>
        <title>worldtrip</title>
        <link rel="icon" type="image/svg" href={icon.src} />
      </Head>
      <Header />
      <Banner />
      <Characteristics />
      <Separator />
      <Heading
        textAlign="center"
        fontWeight="500"
        mb={['5', '14']}
        fontSize={['lg', '3xl', '4xl']}
      >
        Vamos nessa <br />
        Então escolha seu continente
      </Heading>
      <Slides continents={continents} />
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.getAllByType('continent')

  const continents = response.map((continent) => {
    return {
      slug: continent.uid,
      title: continent.data.title,
      summary: continent.data.summary,
      image: continent.data.slideimage.url,
    }
  })

  return {
    props: {
      continents,
    },
    revalidate: 1800,
  }
}
