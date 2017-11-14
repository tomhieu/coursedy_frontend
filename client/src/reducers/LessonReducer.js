import * as lessonActions from "../actions/LessonActionCreator";
const CourseSection = (state= {lessonList: [], showLessonPopup: false, activeLesson: null}, action) => {
    switch (action.type) {
        case lessonActions.ADD_MORE_LESSON:
            return [...state, {showPopupEdit: true}];
        case lessonActions.EDIT_DETAIL_LESSON:
            let activeLesson = null;
            let editLessonList = state.lessonCreationForm.lessonList.slice();
            editLessonList.map(lesson => {
                if (lesson.id === action.data) {
                    activeLesson = lesson;
                }
            })
            return Object.assign({}, state, { showLessonPopup: true, lessonList: editLessonList, activeLesson: activeLesson});
        case lessonActions.SAVE_LESSON_SUCESSFULLY:
            let updatedLessonList = JSON.parse(JSON.stringify(state.lessonList));
            updatedLessonList.push(action.data);
            return Object.assign({}, state, {
                activeLesson: null,
                lessonList: updatedLessonList,
                showLessonPopup: false
            });
        case lessonActions.HIDE_LESSON_POPUP_EDIT:
            return [...state, {showLessonPopup: false, activeLesson: null}];
        case lessonActions.DELETE_LESSON_SUCESSFULLY:
            let deletedLessonList = JSON.parse(JSON.stringify(state.lessonList)).filter(lesson => lesson.id === action.data);
            return [...state, {lessonList: deletedLessonList}];
        case lessonActions.ADD_DOCUMENT_FOR_LESSON:
            let copyLessonList = JSON.parse(JSON.stringify(state.lessonList));
            copyLessonList.map(lesson => {
                if (lesson.id === action.data.id) {
                    lesson.documents.push(action.data.document)
                }
            });
            return Object.assign({}, state, {lessonList: copyLessonList});
        case lessonActions.DELETE_DOCUMENT_FOR_LESSON:
            let deletedLessonList = JSON.parse(JSON.stringify(state.lessonList));
            let deletedLesson = deletedLessonList.filter(lesson => lesson.id === action.data.id);
            if (Array.isArray(deletedLesson)) {
                deletedLesson[0].documents.splice(deletedLesson[0].documents.findIndex((e, i) => {
                    return e.uid === action.data.documentId;
                }), 1);
                return Object.assign({}, state, {lessonList: deletedLessonList});
            }
        default:
            return state;

    }
}