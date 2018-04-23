//FIXME: Remove me top teacher in month
export const dummyTopTeachers = {
  total: 100,
  teachers: [
    {
      id: 1,
      avatar: 'http://placehold.it/100x100',
      full_name: 'Lê Vinh Hiệp',
      job: 'Giáo viên Tiếng Anh',
      starRate: 5
    },
    {
      id: 2,
      avatar: 'http://placehold.it/100x100',
      full_name: 'Nguyễn Bao Anh',
      job: 'Giáo viên Toán',
      starRate: 4.5
    },
    {
      id: 3,
      avatar: 'http://placehold.it/100x100',
      full_name: 'Phạm Quốc Việt',
      job: 'Giáo viên Vật Lý',
      starRate: 3
    }
  ]
}

export const dummyTeacherDetail = ({id}) => ({
  id: id,
  title: "Computer Teacher",
  description: "Breakfast procuring nay end happiness allowance assurance frankness. Met simplicity nor difficulty unreserved who. Entreaties mr conviction dissimilar me astonished estimating cultivated. On no applauded exquisite my additions. Pronounce add boy estimable nay suspected. You sudden nay elinor thirty esteem temper. Quiet leave shy you gay off asked large style.",
  user_id: id,
  user: {
    id: id,
    name: "Alexey Barnashov",
    phone_number: "+ 971 4 436 4784",
    email: "contact-instructor@email.com",
    roles: [
      "teacher"
    ],
    address: "545, Marina Rd., Mohammed Bin Rashid Boulevard, Dubai 123234, UAE",
    date_of_birth: {month: 12, day: 12, year: 1988},
    gender: "M",
    avatar: "http://crenoveative.com/envato/edutute/images/man/20.jpg"
  },
  linkedIn: "https://linkedin.com/pub/stephen-grider/20/a23/170",
  twitter: "https://twitter.com/ste_grider",
  hour_rate: null,
  star_average: 4.5,
  qualification_verified: true,
  highest_education: null,
  categories: [
    {id: 1, name: "HTML"},
    {id: 2, name: "CSS3"},
    {id: 3, name: "jQuery"},
    {id: 4, name: "Creative"},
    {id: 5, name: "Design"},
  ],
  currency: null,
  qualifications: [
    {school: {name: "University of Toronto"}, graduation_year: 2016, degree_name: "Bachelor of Computer Science", description: "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end." },
    {school: {name: "University of Boston"}, graduation_year: 2009, degree_name: "Master of Computer Science", description: "Breakfast procuring nay end happiness allowance assurance frankness. Met simplicity nor difficulty unreserved who. Entreaties mr conviction dissimilar me astonished estimating cultivated. On no applauded exquisite my additions." },
  ],
  experiences: [
    {company: {name: "Google Inc"}, year_work: "2006-2009", job_title: "Web Design", description: "Compliment interested discretion estimating on stimulated apartments oh. Dear so sing when in find read of call. As distrusts behaviour abilities defective is."},
    {company: {name: "Yahoo Inc"}, year_work: "2009-2012", job_title: "Web Development", description: "Compliment interested discretion estimating on stimulated apartments oh. Dear so sing when in find read of call. As distrusts behaviour abilities defective is."},
  ],
  awards: [
    {name: "Compliment interested discretion", description: "Compliment interested discretion estimating on stimulated apartments oh. Dear so sing when in find read of call. As distrusts behaviour abilities defective is."},
    {name: "Parish enable innate formed missed", description: "Hand two was eat busy fail. Stand smart grave would in so. Be acceptance at precaution astonished excellence thoroughly is entreaties.\n" + "\n"},
  ],
  ratings: [
    {
      id: 1,
      name: 'content',
      star: 5,
    },
    {
      id: 2,
      name: 'knowledge',
      star: 5,
      star_assignment: 4.5,
      star_classroom: 4.5
    },
    {
      id: 3,
      name: 'assignment',
      star: 4.5,
    },
    {
      id: 4,
      name: 'classroom',
      star: 4.5,
    },
  ],
  reviews: {
    headers: {xPage: 1, xPerPage: 10, xTotal: 2},
    data: [
      {user: {id: 1, name: "Antony Robert", avatar: "http://crenoveative.com/envato/edutute/images/man/01.jpg", }, rating: 5, text: "Antony Robert is an excellent teacher. Great computer skills. Very polite and sensible. I'm very pleased with the way he teaches me.", created: "1 hours ago",},
      {user: {id: 2, name: "Mohammed Salem", avatar: "http://crenoveative.com/envato/edutute/images/man/02.jpg", }, rating: 5, text: "Antony Robert teaches in an exemplary manner, explaining concepts to the learner in utmost depth using a lenient and engaging manner of teaching. Would highly recommend to all.", created: "3 hours ago",},
    ]
  },
  interest: "On formed merits hunted unable merely by mr whence or stimulated apartments.",
  courses: {
    headers: {xPage: 1, xPerPage: 10, xTotal: 3},
    data: [
      {id: 1, title: "Foundations of Enterprise Development for Windows", description: "Create Code That Screams with C++! Hours of Video Lecture, Lab Exercises and Dozens of Code Samples for You To Use! Dave Pither-Patterson", cover_image: "", rating: 5, period: 15, start_date: "2018-04-16T00:00:00.000Z", tuition_fee: 3750000, category: {id: 1, name: "Programming"}, user: {id: 1, name: "Mark Lassoff", avatar: "http://crenoveative.com/envato/edutute/images/testimonial/01.jpg"}, rating_points: 3.5, rating_count: 10, lesson_count: 50,},
      {id: 2, title: "Food Photography: Shooting at Restaurants", description: "She propriety immediate was improving. He or entrance humoured likewise moderate. Much nor game son say feel.", cover_image: "http://crenoveative.com/envato/edutute/images/course-item/02.jpg", rating: 5, period: 15, start_date: "2018-04-16T00:00:00.000Z", tuition_fee: 4750000, category: {id: 2, name: "Photography"}, user: {id: 2, name: "Nicholas Mavrakis", avatar: "http://crenoveative.com/envato/edutute/images/testimonial/01.jpg"}, rating_points: 4.5, rating_count: 20, lesson_count: 30,},
      {id: 3, title: "Food Photography: Shooting at Restaurants", description: "She propriety immediate was improving. He or entrance humoured likewise moderate. Much nor game son say feel.", cover_image: "http://crenoveative.com/envato/edutute/images/course-item/02.jpg", rating: 5, period: 15, start_date: "2018-04-16T00:00:00.000Z", tuition_fee: 4750000, category: {id: 2, name: "Photography"}, user: {id: 3, name: "Ange Ermolova", avatar: "http://crenoveative.com/envato/edutute/images/testimonial/03.jpg"}, rating_points: 3, rating_count: 5, lesson_count: 40,},
    ]
  }
})
