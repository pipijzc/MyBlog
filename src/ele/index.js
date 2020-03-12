import Vue from 'vue'

import { Button, Menu, MenuItem, Submenu, MenuItemGroup, Container, Aside, Main, Header, Carousel, CarouselItem, Image, Row, Col, Avatar, Card, Dialog, Form, FormItem, Input, Message, Select, Option, Tooltip } from 'element-ui'

Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.use(Row)
Vue.use(Col)
Vue.use(Avatar)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tooltip)
    // Vue.use(MessageBox)
    // 不能用use
    // Vue.use(Message)
Vue.component(Message)
    // Vue.component(MessageBox);
Vue.prototype.$message = Message
    // Vue.prototype.$alert = MessageBox;