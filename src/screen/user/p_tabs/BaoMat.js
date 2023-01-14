import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../global/styles';
import {Icon} from '@rneui/themed';

export default function BaoMat() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.container, {margin: 10, marginBottom: 0}]}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              color: colors.grey0,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Chính Sách Bảo Mật Của Herich
          </Text>
          <Text style={{fontSize: 16, color: colors.grey0}}>
            {
              'Herich nghiêm túc thực hiện trách nhiệm của mình liên quan đến bảo mật thông tin theo các quy định về bảo vệ bí mật dữ liệu cá nhân của pháp luật Việt Nam.\nBên dưới là tóm tắt sơ lược cách thức chúng tôi thu thập, sử dụng, và bảo vệ thông tin cá nhân của bạn. Việc đảm bảo người dùng Herich có trải nghiệm an toàn, bảo mật và hiểu được thông tin cá nhân của mình được thu thập và xử lý như thế nào là vô cùng quan trọng đối với Herich'
            }
          </Text>
        </View>
        <View style={{marginTop: 20, margin: 10}}>
          <Text
            style={{
              color: colors.buttonssmall,
              fontSize: 17,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            1. Herich thu thập những thông tin gì?
          </Text>
          <Text
            style={{
              color: colors.grey0,
              fontSize: 16,
            }}>
            Herich thu thập các dữ liệu cá nhân mà bạn cung cấp cho chúng tôi,
            bao gồm nhưng không giới hạn ở:
          </Text>
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
            <Text style={styles.textC}>{'Tên'}</Text>
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
            <Text style={styles.textC}>Địa chỉ email</Text>
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
            <Text style={styles.textC}>Số điện thoại</Text>
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
            <Text style={styles.textC}>{'Thông tin thanh toán'}</Text>
          </View>
          <Text style={styles.textC}>
            {
              'Herich thu thập thông tin có liên quan đến việc sử dụng trình duyệt, ứng dụng, và các thiết bị mà bạn dùng để truy cập các dịch vụ của Herich, cũng như các thông tin về cách thức bạn sử dụng và tương tác với chúng tôi hoặc các dịch vụ'
            }
          </Text>
        </View>

        <View style={{marginTop: 10, margin: 10}}>
          <Text
            style={{
              color: colors.buttonssmall,
              fontSize: 17,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            2. Herich sử dụng các dữ liệu cá nhân được cung cấp như thế nào?
          </Text>
          <Text
            style={{
              color: colors.grey0,
              fontSize: 16,
              marginBottom: 10,
            }}>
            Herich xử lý thông tin cá nhân của bạn cho một số mục đích, bao gồm
            nhưng không giới hạn ở:
          </Text>
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
            <Text style={styles.textC}>Để liên hệ với bạn</Text>
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
              Để quản lý tài khoản Herrich của bạn
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
            <Text style={styles.textC}>Để xử lý giao dịch cho bạn</Text>
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
              Để nâng cấp sàn giao dịch và cải thiện các dịch vụ của chúng tôi
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
              Để cá nhân hóa quá trình bạn sử dụng các dịch vụ của chúng tôi
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
              Thông báo cho bạn các cập nhật có liên quan
            </Text>
          </View>

          <Text style={styles.textC}>
            {
              'Herich chỉ xử lý thông tin cá nhân của bạn cho mục đích tuân thủ quy định pháp luật, để quản lý các hệ thống và tài chính, để điều tra, cũng như thực thi các quyền hiến định.'
            }
          </Text>
        </View>

        <View style={{marginTop: 10, margin: 10}}>
          <Text
            style={{
              color: colors.buttonssmall,
              fontSize: 17,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            3. Ai có thể truy cập thông tin cá nhân của bạn?
          </Text>
          <Text
            style={{
              color: colors.grey0,
              fontSize: 16,
            }}>
            Chúng tôi hạn chế việc truy cập thông tin cá nhân của bạn. Tuy nhiên
            chúng tôi theo từng thời điểm cần phải cung cấp thông tin cá nhân
            của bạn cho bên thứ ba nhất định theo nhu cầu công việc hoặc mục
            đích pháp lý. Bên thứ ba này bao gồm, nhưng không giới hạn ở:
          </Text>
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
              Các công ty liên kết hoặc công ty liên quan của chúng tôi
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
              Nhà cung cấp dịch vụ thứ ba mà chúng tôi thuê để hỗ trợ hoặc bổ
              sung cho hoạt động kinh doanh của chúng tôi
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
            <Text style={styles.textC}>Cơ quan nhà nước có thẩm quyền</Text>
          </View>
        </View>

        <View style={{marginTop: 10, margin: 10}}>
          <Text
            style={{
              color: colors.buttonssmall,
              fontSize: 17,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            4. Cập nhật đối với Chính Sách Bảo Mật của chúng tôi
          </Text>
          <Text
            style={{
              color: colors.grey0,
              fontSize: 16,
              marginBottom: 10,
            }}>
            {
              'Vui lòng lưu ý rằng khi công nghệ, quy định pháp luật, cũng như hoạt động kinh doanh của chúng tôi có sự chuyển hóa, Herich có thể cần phải cập nhật Chính Sách Bảo Mật theo từng thời kỳ. Theo đó, Herich bảo lưu quyền chỉnh sửa hoặc cập nhật Chính Sách Bảo Mật của chúng tôi, và khuyến khích bạn đọc lại thông báo này cũng như Chính Sách Bảo Mật của Herich theo định kỳ.'
            }
          </Text>
        </View>

        <View style={{marginTop: 10, margin: 10}}>
          <Text
            style={{
              color: colors.buttonssmall,
              fontSize: 17,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            5. Các quyền của bạn đối với thông tin cá nhân
          </Text>
          <Text
            style={{
              color: colors.grey0,
              fontSize: 16,
              marginBottom: 10,
            }}>
            Nếu bạn đã chia sẻ thông tin cá nhân với chúng tôi, bạn có quyền:
          </Text>
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
              hỏi các thông tin chúng tôi đã có về bạn
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
              đề xuất các thay đổi hoặc cập nhật trong Chính Sách Bảo Mật
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
            <Text style={styles.textC}>yêu cầu xóa dữ liệu cá nhân</Text>
          </View>
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
  textC: {
    fontSize: 16,
    color: colors.grey0,
    marginLeft: 5,
    marginBottom: 10,
  },
});
