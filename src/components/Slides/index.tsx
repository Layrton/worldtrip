import { Flex, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { ContinentProps } from '../../pages'

export default function Slides({ continents }: ContinentProps) {
  return (
    <Flex
      w="100%"
      maxW="1240px"
      mx="auto"
      mb={['5', '10']}
      h={['250px', '450px']}
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
        }}
        style={{ width: '100%', flex: 1 }}
        slidesPerView={1}
      >
        {continents.map((continent) => (
          <SwiperSlide key={continent.title}>
            <Flex
              w="100%"
              h="100%"
              align="center"
              justify="center"
              direction="column"
              bgImage={`url(${continent.image})`}
              bgRepeat="no-repeat"
              bgSize="cover"
              textAlign="center"
              bgPosition="center"
            >
              <Link href={`/continent/${continent.slug}`}>
                <Heading
                  fontSize={['3xl', '4xl', '5xl']}
                  color="gray.100"
                  fontWeight="bold"
                >
                  {continent.title}
                </Heading>
                <Text
                  fontWeight="bold"
                  color="gray.300"
                  fontSize={['0.8rem', '1xl', '2xl']}
                  mt={['2', '4']}
                >
                  {continent.summary}
                </Text>
              </Link>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  )
}
