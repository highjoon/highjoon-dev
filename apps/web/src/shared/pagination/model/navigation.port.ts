/**
 * 페이지 이동 포트
 * @interface NavigationPort
 * @property {function} goTo - 페이지 이동 함수
 */
export interface NavigationPort {
  goTo: (page: number) => void;
}
