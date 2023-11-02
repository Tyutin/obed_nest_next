/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites(){
    return [
      {
        source: `/${encodeURIComponent('акции')}`,
        destination: `/promo`,
      },
      {
        source: `/${encodeURIComponent('условия-доставки')}`,
        destination: `/delivery`,
      },
      {
        source: `/${encodeURIComponent('о-компании')}`,
        destination: `/about`,
      },
      {
        source: `/${encodeURIComponent('корзина')}`,
        destination: `/cart`,
      },
      {
        source: `/${encodeURIComponent('оформление-заказа')}`,
        destination: `/checkout`,
      },
    ]
  }
}

module.exports = nextConfig
