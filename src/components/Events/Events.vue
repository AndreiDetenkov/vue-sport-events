<template lang="pug">
  .spring-block
    v-container
      v-layout(row justify-center)
        v-timeline
          v-timeline-item(
          v-for="(item, idx) in springEvents",
          :key="idx",
          color="orange",
          small)
            span(slot="opposite") {{ item.icon }}
            v-card
              v-card-title
                .circle-icon.hidden-sm-and-down
                  img(:src="`static/${item.icon }`" width="40")
                h2 {{ item.title }}
              v-divider
              v-card-text
                .block
                  img(src="static/icons/calendar.svg" width='20' alt="дата проведения мероприятия")
                  span {{ item.date }}
                .block
                  img(src="static/icons/distance.svg" width='20' alt="доступные ивенты")
                  span {{ item.distance }}
                .block
                  img(src="static/icons/location.svg" width='20' alt="место проведения мероприятия")
                  span {{ item.location }}
                v-divider.my-2
                .block
                  p {{ item.description }}
              v-card-actions
                div.sponsor
                  span Организатор:&nbsp;&nbsp;
                  a(href="https://www.nomadsport.kg/" target="_blank")
                    img(:src="`static/icons/${item.sponsorLogo}`" width=150)
                v-spacer
                a(href="#").mx-2
                  img(src="static/icons/social/facebook.png" width="30")
                a(href="#").mx-2
                  img(src="static/icons/social/instagram.png" width="30")
                a(href="#").mx-2
                  img(src="static/icons/social/whatsapp.png" width="30")
</template>

<script>
export default {
  name: 'Events',
  data: () => ({
    springEvents: [
      { title: 'Весенняя Разделка',
        icon: 'cycle.png',
        distance: 'Шоссе 25 км | Мтб 25 КМ',
        date: '31 марта 2019',
        location: 'Объездная дорога, 9-й км (Чуйская область)',
        description: 'Велогонка на 25 км с раздельным старом',
        social: {
          instagram: 'https://www.instagram.com/nomadsport_bishkek/',
          facebook: 'https://www.facebook.com/nomadsportkg/'
        },
        sponsorLogo: 'nomad-logo.png'
      },
      { title: 'Bakai Bank Jaz Demi',
        icon: 'run.png',
        distance: '5км | 10км | 21км',
        date: '14 апреля 2019',
        location: 'Стела "Аска-Таш", трасса Бишкек - аэропорт Манас',
        description: 'Bakai Bank - Jaz Demi это беговой старт, ' +
          'где ты сможешь испытать свои возможности и одержать новую победу над собой!',
        sponsorLogo: 'nomad-logo.png'
      },
      { title: 'Issyk Kul Swim Challenge',
        icon: 'swim.png',
        distance: '14км',
        date: '18 августа 2019',
        location: 'Кыргызстан, озеро Иссык-Куль',
        description: '14 км плавания на открытой воде озера,' +
          'которое гордо расположился среди горных хребтов Тянь Шаня',
        sponsorLogo: 'nomad-logo.png'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
  .container {
    padding-top: 0;
    padding-bottom: 0;
    .v-card {
      border-radius: 24px;
      &__title {
        padding: 8px 16px;
        /*justify-content: center;*/
        h2 {
          font-family: 'Jura', sans-serif;
          font-size: 1.8rem;
          color: #e53935;
        }
        .circle-icon {
          position: absolute;
          content: '';
          right: -20px;
          top: -20px;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid lightgrey;
          background: #fff;
          padding-top: 22px;
        }
      }
      &__text {
        text-align: left;
        .block {}
        img {
          display: inline-block;
          margin-right: 8px;
        }
        span {
          display: inline-block;
          transform: translateY(-4px);
        }
        p {
          margin-bottom: 0;
        }
      }
      &__actions {
        padding-top: 0;
        .sponsor {
          padding-left: 8px;
          a {
            text-decoration: none;
            font-weight: 700;
          }
          span {
            display: inline-block;
            transform: translateY(-10px);
          }
        }
      }
    }
  }
</style>
