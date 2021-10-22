export interface CourseMediaDTOInterface {
  id?: number;
  courseId?: number;
  sectionId?: number;
  lessonId?: number;
  channel?: number;
  mediaType?: number;
  coverImageUrl?: string;
  duration?: string;
  fileId?: string;
  fileUrl?: string;
  fileEdk?: string;
  fileSize?: number;
  fileName?: string;
  fileDk?: string;
  createTime?: string;
  updateTime?: string;
  status?: number;
  isDel?: true;
  lastOperatorId?: number;
  durationNum?: number;
}
