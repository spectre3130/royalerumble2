package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.dao.AvatarDao;
import com.fumbler.royalerumble.dao.MemberDao;
import com.fumbler.royalerumble.model.Authenticate;
import com.fumbler.royalerumble.model.Avatar;
import com.fumbler.royalerumble.model.Member;
import com.fumbler.royalerumble.util.ImageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberDao dao;

    @Autowired
    AvatarDao avatarDao;

    @Override
    public Member getMember(String email) throws Exception {
        return dao.selectOne(email);
    }

    @Override
    public Member memberLogin(Authenticate authenticate) throws Exception {
        Member member = dao.selectOne(authenticate.getEmail());
        if (member != null && member.passwordMatching(authenticate.getPassword())) {
            return member;
        }
        return null;
    }

    @Override
    @Transactional
    public boolean memberJoin(Member member) throws Exception {
        return dao.insert(member) == 1;
    }

    @Override
    public boolean duplication(String email, String userName) throws Exception {
        if (userName.equals("null")) {
            return dao.selectOne(email) != null;
        } else {
            return dao.selectUserName(userName) != null;
        }
    }

    @Override
    public Avatar findAvatar(String userName) throws Exception {
        Avatar avatar = avatarDao.selectOne(userName);
        if(avatar == null) {
            avatar = avatarDao.selectOne("anonymous");
        }
        return avatar;
    }

    @Override
    @Transactional
    public boolean avatarUpdate(Avatar avatar) throws Exception {
        int result = 0;
        Avatar oldAvatar = avatarDao.selectOne(avatar.getUserName());
        avatar.setImage(ImageUtil.makeThumb(avatar.getImage()));
        if(oldAvatar == null) {
            result = avatarDao.insert(avatar);
        } else {
            result = avatarDao.update(avatar);
        }
        return result == 1;
    }

    @Override
    @Transactional
    public boolean avatarDelete(String userName) throws Exception {
        return avatarDao.delete(userName) == 1;
    }

    @Override
    @Transactional
    public boolean memberUpdate(Member member) throws Exception {
        return dao.update(member) == 1;
    }

    @Override
    @Transactional
    public void writerUpdate(Member member) throws Exception{
        dao.updateAvatarName(member);
        dao.updateForumName(member);
        dao.updateCommentName(member);
    }

    @Override
    @Transactional
    public boolean passwordUpdate(Member member) throws Exception {
        return dao.update(member) == 1;
    }


}
