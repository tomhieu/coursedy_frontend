export const FETCH_TEACHERS = 'FETCH_TEACHERS'
export const FETCH_TEACHERS_SUCCESS = 'FETCH_TEACHERS_SUCCESS'
export const FETCH_TEACHERS_FAIL = 'FETCH_TEACHERS_FAIL'

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
