import { Flex } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { Cities } from '../../components/Cities'
import Content from '../../components/Content'
import ContinentBanner from '../../components/ContinentBanner'
import Header from '../../components/Header'
import { client } from '../../services/prismic'
import * as prismicH from '@prismicio/helpers'
import { useRouter } from 'next/router'
import Loading from '../../components/Loading'
import Head from 'next/head'
import icon from '../../../public/logo.svg'

export interface ContinentProps {
  continent: {
    slug: string
    title: string
    description: string
    banner_image: string
    countries: number
    languages: number
    cities: number
    cities_list: string
    cities100: {
      city: string
      country: string
      thumbnail: string
      flag: string
    }[]
  }
}

export default function Continent({ continent }: ContinentProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <Loading />
  }

  return (
    <Flex direction="column">
      <Head>
        <title>{continent.title} | worldtrip</title>
        <link rel="icon" type="image/svg" href={icon.src} />
      </Head>
      <Header />
      <ContinentBanner continent={continent} />
      <Flex direction="column" maxW="1160px" mx="auto" mb="10" px="1rem">
        <Content continent={continent} />
        <Cities continent={continent} />
      </Flex>
    </Flex>
  )
}

export const getStaticPaths = async () => {
  const response = await client.getAllByType('continent')

  const paths = response.map((continent) => {
    return {
      params: {
        slug: continent.uid,
      },
    }
  })

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug }: any = context.params

  const response = await client.getByUID('continent', String(slug), {})

  const continent = {
    slug: response.uid,
    title: response.data.title,
    description: prismicH.asText(response.data.description),
    banner_image: response.data.banner_image.url,
    countries: response.data.countries,
    languages: response.data.languages,
    cities: response.data.cities,
    cities_list: response.data.citites_list,
    cities100: response.data.cities100.map((city: any) => {
      return {
        city: city.city,
        country: city.country,
        thumbnail: city.thumbnail.url,
        flag: city.flag.url,
      }
    }),
  }

  return {
    props: {
      continent,
    },
    revalidate: 1800,
  }
}
