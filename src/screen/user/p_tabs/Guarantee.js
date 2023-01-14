import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import React from 'react';
import {colors} from '../../../global/styles';
import {Icon} from '@rneui/themed';

export default function Guarantee() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.container, {margin: 10, marginBottom: 0}]}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              color: colors.grey0,
              fontWeight: 'bold',
            }}>
            {'[Quy định] Chính sách bảo hành cho\nsản phẩm mua tại\n Herich'}
          </Text>
        </View>

        <View style={{marginTop: 20, margin: 10}}>
          <Text style={styles.textA}>1. ĐIỀU KIỆN BẢO HÀNH:</Text>
          <Text style={styles.textB}>
            Sản phẩm được bảo hành miễn phí nếu sản phẩm đó hội đủ các điều kiện
            sau:
          </Text>
          <View style={styles.viewaa}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                type="material"
                name="fiber-manual-record"
                size={8}
                style={{top: 8}}
              />
              <Text style={styles.textC}>
                Sản phẩm bị lỗi kỹ thuật do nhà sản xuất
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                type="material"
                name="fiber-manual-record"
                size={8}
                style={{top: 8}}
              />
              <Text style={styles.textC}>
                Còn trong thời hạn bảo hành (trong vòng 15 ngày sau khi nhận
                hàng)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                type="material"
                name="fiber-manual-record"
                size={8}
                style={{top: 8}}
              />
              <Text style={styles.textC}>
                Có hóa đơn điện tử (khi Người mua có yêu cầu)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                type="material"
                name="fiber-manual-record"
                size={8}
                style={{top: 8}}
              />
              <Text style={styles.textC}>
                Tất cả các trường hợp khách hàng báo lỗi với thông tin chưa rõ
                ràng hoặc chưa chắc chắn Herich sẽ không thẩm định.
              </Text>
            </View>
          </View>

          <Text style={styles.textB}>
            Những trường hợp không được bảo hành hoặc phát sinh phí bảo hành:
          </Text>
          <View style={styles.viewaa}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                type="material"
                name="fiber-manual-record"
                size={8}
                style={{top: 8}}
              />
              <Text style={styles.textC}>
                Vi phạm một trong những điều kiện bảo hành miễn phí ở mục A.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                type="material"
                name="fiber-manual-record"
                size={8}
                style={{top: 8}}
              />
              <Text style={styles.textC}>
                Số series, model sản phẩm không hợp lệ (không khớp với thông tin
                trên Phiếu bảo hành hoặc trên hệ thống bảo hành điện tử)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                type="material"
                name="fiber-manual-record"
                size={8}
                style={{top: 8}}
              />
              <Text style={styles.textC}>
                Khách hàng tự ý can thiệp sửa chữa sản phẩm hoặc sửa chữa tại
                những trung tâm bảo hành không được sự ủy nhiệm của Hãng
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                type="material"
                name="fiber-manual-record"
                size={8}
                style={{top: 8}}
              />
              <Text style={styles.textC}>
                Sản phẩm bị hư hỏng do lỗi người sử dụng, và lỗi hư không nằm
                trong phạm vi bảo hành của nhà sản xuất
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 20, margin: 10}}>
          <Text style={styles.textA}>2. THỜI HẠN BẢO HÀNH:</Text>
          <Text style={{color: '#000', marginLeft: 10}}>
            {
              'Thời hạn bảo hành được tính kể từ ngày mua hàng hoặc ngày nhận được sản phẩm, tùy theo từng sản phẩm.\n\nĐối với sản phẩm bảo hành điện tử, thời hạn bảo hành được tính từ thời điểm kích hoạt bảo hành điện tử\nLưu ý: Người Mua có thể gửi yêu cầu hóa đơn VAT tới bộ phận Chăm sóc khách hàng Herich để được hỗ trợ.'
            }
          </Text>
        </View>

        <View style={{marginTop: 20, margin: 10}}>
          <Text style={styles.textA}>3. TRUNG TÂM BẢO HÀNH:</Text>
          <Text style={{color: '#000', marginLeft: 10}}>
            {
              'Thông tin của trung tâm bảo hành sẽ được ghi trong phiếu bảo hành kèm theo sản phẩm hoặc trên phần mô tả thông tin chi tiết của sản phẩm. Quý khách vui lòng liên hệ trực tiếp với trung tâm bảo hành để được hỗ trợ trong thời gian ngắn nhất\n\nTrong trường hợp quý khách gặp khó khăn trong việc liên hệ trung tâm bảo hành, ở quá xa trung tâm bảo hành hoặc gặp các vấn đề bất tiện không thể đến trung tâm bảo hành trực tiếp, quý khách có thể liên hệ bộ phận Chăm sóc khách hàng Shopee để được hỗ trợ:\n\n1. Hotline: 19001000\n\n2. Email: https://help.herich.vn/portal/webform/5678h67897h7h67h776f5cf'
            }
          </Text>
        </View>
        <View style={{marginTop: 20, margin: 10}}>
          <Text style={styles.textA}>4. THỜI GIAN BẢO HÀNH:</Text>
          <Text style={{color: '#000', marginLeft: 10}}>
            {
              'Quý khách gửi sản phẩm bảo hành về Herich, chúng tôi sẽ gửi thông báo xác nhận đến quý khách khi Herich nhận được sản phẩm.\n\nThời gian bảo hành sản phẩm của quý khách dự kiến từ 7 ngày đến 10 ngày làm việc tính từ lúc Herich nhận được sản phẩm, tùy thuộc vào linh kiện, phụ kiện, vật liệu cần thay thế và Herich sẽ thông báo chi tiết đến quý khách sau khi bảo hành hoàn tất.'
            }
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image source={require('../../../images/baohanh.png')} />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textA: {
    fontWeight: 'bold',
    color: colors.grey0,
    fontSize: 18,
    marginBottom: 15,
  },
  textB: {
    fontWeight: 'bold',
    color: colors.grey0,
    fontSize: 17,
  },
  viewaa: {
    marginLeft: 10,
  },
  textC: {
    fontSize: 16,
    color: colors.grey0,
    marginLeft: 5,
  },
});
