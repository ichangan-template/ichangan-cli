const getReportUrl = (name) => {
  return `direct:https://github.com/ichangan-template/${name}#main`
}

const mobileVueRepo = getReportUrl('mobile-vue')

const repoMap = {
  '00': mobileVueRepo
}

export default repoMap